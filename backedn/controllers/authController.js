const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
const generateToken = require('../utils/generateToken');

// User Registration
// User Registration
const registerUser = async (req, res) => {
  const { name, email, phone, password, isAdmin, address, organizationName, typesOfWork } = req.body;

  try {
    const userExists = await User.findOne({ $or: [{ email }, { phone }] });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = new User({
      name,
      email,
      phone,
      password,
      isAdmin,
      address,
      organizationName,
      typesOfWork,
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const token = generateToken(user._id, user.isAdmin);

    res.status(201).json({
      message: 'User registered successfully',
      statusCode: 201,
      data: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        isAdmin: user.isAdmin,
        address: user.address,
        organizationName: user.organizationName,
        typesOfWork: user.typesOfWork,
        token,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', statusCode: 500 });
  }
};

// User Login
const authUser = async (req, res) => {
  const { email, phone, password } = req.body;

  try {
    const user = await User.findOne({ $or: [{ email }, { phone }] });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(user._id, user.isAdmin);

    res.status(200).json({
      message: 'Login successful',
      statusCode: 200,
      data: { name: user.name, address: user.address,
        phone: user.phone,
        organizationName: user.organizationName,
        typesOfWork: user.typesOfWork, 
        token, isAdmin: user.isAdmin },
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', statusCode: 500 });
  }
};

module.exports = { registerUser, authUser };
