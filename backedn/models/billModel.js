const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  unit: { type: String, required: true },
  rate: { type: Number, required: true },
  amount: { type: Number, required: true },
});

const billSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  billNo: { type: String, required: true, unique: true },
  date: { type: Date, default: Date.now },
  items: [itemSchema],
  road: { type: String },
  totalAmount: { type: Number, required: true },
  cgst: { type: Number, default: 0 },
  sgst: { type: Number, default: 0 },
  igst: { type: Number, default: 0 },
}, {
  timestamps: true,
});

const Bill = mongoose.model('Bill', billSchema);

module.exports = Bill;
