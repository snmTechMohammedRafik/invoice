// routes/companyRoutes.js
const express = require('express');
const router = express.Router();
const {
  createCompany,
  getAllCompanies,
  getCompanyById,
  updateCompany,
  deleteCompany,
} = require('../controllers/companyController');
const authenticateToken = require('../middlewares/authMiddleware');

// Create a new company
router.post('/',  createCompany);

// Retrieve all companies
router.get('/',  getAllCompanies);

// Retrieve a company by ID
router.get('/:id',  getCompanyById);

// Update a company by ID
router.put('/:id',  updateCompany);
// router.put('/:id', authenticateToken, updateCompany);

// Delete a company by ID
router.delete('/:id', deleteCompany);

module.exports = router;
