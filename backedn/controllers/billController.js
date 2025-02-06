// controllers/billController.js
const Bill = require('../models/billModel');
const PDFDocument = require('pdfkit');
const generateInvoice = require('../utils/invoiceGenerator');
const path = require('path');

const createBill = async (req, res, next) => {
  try {
    const { customerName, billNo, date, items, road, totalAmount, cgst, sgst, igst } = req.body;

    // Validate totalAmount
    if (typeof totalAmount !== 'number' || totalAmount <= 0) {
      return res.status(400).json({ message: 'Invalid totalAmount. It must be a positive number.' });
    }

    const bill = new Bill({
      customerName,
      billNo,
      date,
      items,
      road,
      totalAmount,
      cgst: cgst || 0,
      sgst: sgst || 0,
      igst: igst || 0,
    });

    const savedBill = await bill.save();

    // Generate PDF Invoice
    const invoiceData = {
      invoiceNumber: bill.billNo,
      invoiceDate: bill.date.toDateString(),
      dueDate: 'Specify due date here',
      customerName: bill.customerName,
      items: bill.items,
      subtotal: bill.totalAmount,
      cgst: bill.cgst,
      sgst: bill.sgst,
      igst: bill.igst,
      total: bill.totalAmount + bill.cgst + bill.sgst + bill.igst,
    };
    const outputPath = path.join(__dirname, `../../invoices/invoice_${bill.billNo}.pdf`);
    generateInvoice(invoiceData, outputPath);

    res.status(201).json({ message: 'Bill created successfully', data: savedBill });
  } catch (error) {
    next(error);
  }
};

// Generate PDF for a bill by ID
const generateBillPdf = async (req, res, next) => {
  try {
    const bill = await Bill.findById(req.params.id);
    if (!bill) {
      return res.status(404).json({ message: 'Bill not found' });
    }

    // Create a new PDF document
    const doc = new PDFDocument();

    // Set the response to handle a PDF file
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=bill_${bill.billNo}.pdf`);

    // Pipe the PDF into the response
    doc.pipe(res);

    // Add content to the PDF
    doc.fontSize(20).text(`Bill No: ${bill.billNo}`, { align: 'center' });
    doc.moveDown();
    doc.fontSize(16).text(`Customer Name: ${bill.customerName}`);
    doc.text(`Date: ${bill.date.toDateString()}`);
    doc.text(`Road: ${bill.road}`);
    doc.moveDown();

    doc.fontSize(16).text('Items:');
    bill.items.forEach((item, index) => {
      doc.text(
        `${index + 1}. ${item.name} - ${item.unit} units at $${item.rate}/unit - Amount: $${item.amount}`
      );
    });

    doc.moveDown();
    doc.text(`CGST: $${bill.cgst}`);
    doc.text(`SGST: $${bill.sgst}`);
    doc.text(`IGST: $${bill.igst}`);
    doc.moveDown();
    doc.fontSize(18).text(`Total Amount: $${bill.totalAmount}`, { align: 'right' });

    // Finalize the PDF and end the stream
    doc.end();
  } catch (error) {
    next(error);
  }
};


// Create a new bill
// const createBill = async (req, res, next) => {
//     try {
//       const { customerName, billNo, date, items, road, totalAmount, cgst, sgst, igst } = req.body;
  
//       // Validate totalAmount
//       if (typeof totalAmount !== 'number' || totalAmount <= 0) {
//         return res.status(400).json({ message: 'Invalid totalAmount. It must be a positive number.' });
//       }
  
//       const bill = new Bill({
//         customerName,
//         billNo,
//         date,
//         items,
//         road,
//         totalAmount,
//         cgst: cgst || 0,
//         sgst: sgst || 0,
//         igst: igst || 0,
//       });
  
//       const savedBill = await bill.save();
//       res.status(201).json({ message: 'Bill created successfully', data: savedBill });
//     } catch (error) {
//       next(error);
//     }
//   };
  

// Retrieve all bills
const getAllBills = async (req, res, next) => {
  try {
    const bills = await Bill.find();
    res.status(200).json({ message: 'Bills retrieved successfully', data: bills });
  } catch (error) {
    next(error);
  }
};

// Retrieve a bill by ID
const getBillById = async (req, res, next) => {
  try {
    const bill = await Bill.findById(req.params.id);
    if (!bill) {
      return res.status(404).json({ message: 'Bill not found' });
    }
    res.status(200).json({ message: 'Bill retrieved successfully', data: bill });
  } catch (error) {
    next(error);
  }
};

// Update a bill by ID
const updateBill = async (req, res, next) => {
    try {
      const { customerName, billNo, date, items, road, totalAmount, cgst, sgst, igst } = req.body;
  
      // Validate totalAmount
      if (typeof totalAmount !== 'number' || totalAmount <= 0) {
        return res.status(400).json({ message: 'Invalid totalAmount. It must be a positive number.' });
      }
  
      const updatedBill = await Bill.findByIdAndUpdate(
        req.params.id,
        {
          customerName,
          billNo,
          date,
          items,
          road,
          totalAmount,
          cgst: cgst || 0,
          sgst: sgst || 0,
          igst: igst || 0,
        },
        { new: true, runValidators: true }
      );
  
      if (!updatedBill) {
        return res.status(404).json({ message: 'Bill not found' });
      }
  
      res.status(200).json({ message: 'Bill updated successfully', data: updatedBill });
    } catch (error) {
      next(error);
    }
  };
  

// Delete a bill by ID
const deleteBill = async (req, res, next) => {
  try {
    const deletedBill = await Bill.findByIdAndDelete(req.params.id);
    if (!deletedBill) {
      return res.status(404).json({ message: 'Bill not found' });
    }
    res.status(200).json({ message: 'Bill deleted successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createBill,
  getAllBills,
  getBillById,
  updateBill,
  deleteBill,
  generateBillPdf,
};  