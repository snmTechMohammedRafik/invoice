// routes/billRoutes.js
const express = require('express');
const router = express.Router();
const {
  createBill,
  getAllBills,
  getBillById,
  updateBill,
  deleteBill,
  generateBillPdf, // Import the new controller function
} = require('../controllers/billController');

// Create a new bill
router.post('/', createBill);

// Retrieve all bills
router.get('/', getAllBills);

// Retrieve a bill by ID
router.get('/:id', getBillById);

// Update a bill by ID
router.put('/:id', updateBill);

// Delete a bill by ID
router.delete('/:id', deleteBill);

// Route to generate PDF for a specific bill
router.get('/:id/pdf', generateBillPdf);


module.exports = router;
