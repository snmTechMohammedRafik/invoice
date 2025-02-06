// controllers/companyController.js
const Company = require('../models/companyModel');

// Create a new company
const createCompany = async (req, res, next) => {
  try {
    const { companyName, ownerName } = req.body;
    const company = new Company({ companyName, ownerName });
    const savedCompany = await company.save();
    res.status(201).json({ message: 'Company created successfully', data: savedCompany });
  } catch (error) {
    next(error);
  }
};

// Retrieve all companies
const getAllCompanies = async (req, res, next) => {
  try {
    const companies = await Company.find();
    res.status(200).json({ message: 'Companies retrieved successfully', data: companies });
  } catch (error) {
    next(error);
  }
};

// Retrieve a company by ID
const getCompanyById = async (req, res, next) => {
  try {
    const company = await Company.findById(req.params.id);
    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }
    res.status(200).json({ message: 'Company retrieved successfully', data: company });
  } catch (error) {
    next(error);
  }
};

// Update a company by ID
const updateCompany = async (req, res, next) => {
  try {
    const { companyName, ownerName } = req.body;
    const company = await Company.findByIdAndUpdate(
      req.params.id,
      { companyName, ownerName },
      { new: true, runValidators: true }
    );
    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }
    res.status(200).json({ message: 'Company updated successfully', data: company });
  } catch (error) {
    next(error);
  }
};

// Delete a company by ID
const deleteCompany = async (req, res, next) => {
  try {
    const company = await Company.findByIdAndDelete(req.params.id);
    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }
    res.status(200).json({ message: 'Company deleted successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createCompany,
  getAllCompanies,
  getCompanyById,
  updateCompany,
  deleteCompany,
};
