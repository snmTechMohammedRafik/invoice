const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors'); // Import CORS
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const companyRoutes = require('./routes/companyRoutes');
const billRoutes = require('./routes/billRoutes');

dotenv.config();

const app = express();

connectDB();

// Enable CORS
const allowedOrigins = ['http://localhost:5173', 'https://yourdomain.com'];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/companies', companyRoutes);
app.use('/api/bills', billRoutes);

// Import the error handler
const errorHandler = require('./middlewares/errorHandler');
app.use(errorHandler);

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server running on port ${process.env.PORT || 5000}`);
});
