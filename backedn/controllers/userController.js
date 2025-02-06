const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
const generateToken = require('../utils/generateToken');

// Create a new user
const createUser = async (req, res) => {
  const { name, email, phone, password, isAdmin } = req.body;

  try {
    const userExists = await User.findOne({ $or: [{ email }, { phone }] });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists', statusCode: 400 });
    }

    const user = new User({ name, email, phone, password, isAdmin });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const token = generateToken(user._id, user.isAdmin);

    res.status(201).json({
      message: 'User created successfully',
      statusCode: 201,
      data: { name: user.name, token, isAdmin: user.isAdmin },
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', statusCode: 500 });
  }
};

// Get all users
const getUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.status(200).json({
      message: 'Users retrieved successfully',
      statusCode: 200,
      data: users,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', statusCode: 500 });
  }
};

// Get a single user by ID
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found', statusCode: 404 });
    }
    res.status(200).json({
      message: 'User retrieved successfully',
      statusCode: 200,
      data: user,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', statusCode: 500 });
  }
};

// Update a user by ID
const updateUser = async (req, res) => {
  const { name, email, phone, isAdmin } = req.body;

  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found', statusCode: 404 });
    }

    user.name = name || user.name;
    user.email = email || user.email;
    user.phone = phone || user.phone;
    user.isAdmin = isAdmin !== undefined ? isAdmin : user.isAdmin;

    await user.save();

    res.status(200).json({
      message: 'User updated successfully',
      statusCode: 200,
      data: user,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', statusCode: 500 });
  }
};

// Delete a user by ID
const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found', statusCode: 404 });
    }

    await user.remove();

    res.status(200).json({
      message: 'User deleted successfully',
      statusCode: 200,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', statusCode: 500 });
  }
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
};
