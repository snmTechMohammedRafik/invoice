// utils/invoiceGenerator.js
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

function generateInvoice(invoiceData, outputPath) {
  const doc = new PDFDocument({ margin: 50 });

  // Pipe the PDF into a writable stream
  doc.pipe(fs.createWriteStream(outputPath));

  // Header
  doc
    .image(path.join(__dirname, 'path/to/logo.png'), 50, 45, { width: 50 })
    .fillColor('#444444')
    .fontSize(20)
    .text('Your Company Name', 110, 57)
    .fontSize(10)
    .text('Your Company Address', 200, 65, { align: 'right' })
    .text('City, State, ZIP Code', 200, 80, { align: 'right' })
    .moveDown();

  // Invoice Title
  doc
    .fillColor('#000000')
    .fontSize(20)
    .text('INVOICE', 50, 160);

  // Customer Information
  doc
    .fontSize(10)
    .text(`Invoice Number: ${invoiceData.invoiceNumber}`, 50, 200)
    .text(`Invoice Date: ${invoiceData.invoiceDate}`, 50, 215)
    .text(`Due Date: ${invoiceData.dueDate}`, 50, 230)
    .text(`Customer Name: ${invoiceData.customerName}`, 50, 245)
    .moveDown();

  // Table Header
  doc
    .fontSize(10)
    .text('Item', 50, 300)
    .text('Description', 150, 300)
    .text('Quantity', 280, 300, { width: 90, align: 'right' })
    .text('Rate', 370, 300, { width: 90, align: 'right' })
    .text('Amount', 0, 300, { align: 'right' });

  // Horizontal line
  doc
    .moveTo(50, 315)
    .lineTo(550, 315)
    .stroke();

  // Table Rows
  let y = 330;
  invoiceData.items.forEach((item, index) => {
    doc
      .fontSize(10)
      .text(item.name, 50, y)
      .text(item.description, 150, y)
      .text(item.quantity, 280, y, { width: 90, align: 'right' })
      .text(item.rate, 370, y, { width: 90, align: 'right' })
      .text(item.amount, 0, y, { align: 'right' });
    y += 20;
  });

  // Total Amount
  doc
    .fontSize(10)
    .text(`Subtotal: ${invoiceData.subtotal}`, 400, y + 20, { align: 'right' })
    .text(`CGST: ${invoiceData.cgst}`, 400, y + 35, { align: 'right' })
    .text(`SGST: ${invoiceData.sgst}`, 400, y + 50, { align: 'right' })
    .text(`IGST: ${invoiceData.igst}`, 400, y + 65, { align: 'right' })
    .text(`Total: ${invoiceData.total}`, 400, y + 80, { align: 'right' });

  // Footer
  doc
    .fontSize(10)
    .text('Thank you for your business.', 50, 700, { align: 'center', width: 500 });

  // Finalize the PDF and end the stream
  doc.end();
}

module.exports = generateInvoice;
