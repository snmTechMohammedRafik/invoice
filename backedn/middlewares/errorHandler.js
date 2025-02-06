// middleware/errorHandler.js
const errorHandler = (err, req, res, next) => {
    console.error('Unhandled error:', err);
    res.status(500).json({ message: 'Internal Server Error', statusCode: 500 });
  };
  
  module.exports = errorHandler;
  