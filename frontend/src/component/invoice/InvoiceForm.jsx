import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addBill, editBill, fetchBills } from "../redux/billSlice";
import { useNavigate, useParams } from "react-router-dom";
import { fetchCompanies } from "../redux/companySlice";
import { fetchProducts } from "../redux/productSlice";

const InvoiceForm = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { bills } = useSelector((state) => state.bills);
  const { companies } = useSelector((state) => state.company);
  const { products } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(fetchCompanies());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const [formData, setFormData] = useState({
    customerName: '',
    billNo: '',
    date: '',
    road: '',
    items: [{ name: '', unit: '', rate: 0, amount: 0, price: 0 }], // Ensure rate is included
    cgst: 0,
    sgst: 0,
    igst: 0,
    totalAmount: 0,
  });
  
  useEffect(() => {
    if (id && bills.length === 0) {
      dispatch(fetchBills());
    }
  }, [id, dispatch, bills.length]);

  useEffect(() => {
    if (id) {
      const billToEdit = bills.find((bill) => bill._id === id);
      if (billToEdit) {
        setFormData({
          ...billToEdit,
          date: billToEdit.date ? billToEdit.date.split("T")[0] : "", // Convert ISO to YYYY-MM-DD
        });
      }
    }
  }, [id, bills]);
  

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...formData.items];
  
    if (field === "name") {
      // Find the selected product
      const selectedProduct = products.find((product) => product._id === value);
  
      if (selectedProduct) {
        updatedItems[index] = {
          ...updatedItems[index],
          _id: selectedProduct._id, // Store product ID
          name: selectedProduct.name, // Display name
          rate: selectedProduct.price, // Set price
          unit: updatedItems[index].unit || 1, // Keep the unit or default to 1
          amount: (updatedItems[index].unit || 1) * selectedProduct.price, // Calculate amount
        };
      }
    } else if (field === "unit") {
      // Ensure amount updates when unit changes
      updatedItems[index] = {
        ...updatedItems[index],
        unit: value,
        amount: (parseFloat(value) || 0) * updatedItems[index].rate, // Calculate amount dynamically
      };
    } else {
      updatedItems[index][field] = value;
    }
  
    // Update state
    setFormData({
      ...formData,
      items: updatedItems,
      totalAmount: updatedItems.reduce((sum, item) => sum + item.amount, 0), // Update total
    });
  };
  
  
  
  

  const addItem = () => {
    setFormData({
      ...formData,
      items: [...formData.items, { name: "", unit: "", rate: "", amount: 0 }],
    });
  };

  const removeItem = (index) => {
    const updatedItems = formData.items.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      items: updatedItems,
      totalAmount: updatedItems.reduce((sum, item) => sum + item.amount, 0),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      dispatch(editBill({ _id: id, billData: formData }));
    } else {
      dispatch(addBill(formData));
    }
    navigate("/invoice");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg"
    >
      <h2 className="text-2xl font-bold text-center mb-6">
        {id ? "Edit Invoice" : "Create Invoice"}
      </h2>

      {/* Customer Name Dropdown */}
      <label className="block text-lg font-medium mb-2">Customer Name:</label>
      <select
        name="customerName"
        value={formData.customerName}
        onChange={handleChange}
        className="w-full p-3 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      >
        <option value="">Select a Customer</option>
        {companies.map((company) => (
          <option key={company._id} value={company.companyName}>
            {company.companyName}
          </option>
        ))}
      </select>

      <label className="block text-lg font-medium mb-2">Bill No:</label>
      <input
        type="text"
        name="billNo"
        value={formData.billNo}
        onChange={handleChange}
        className="w-full p-3 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />

      <label className="block text-lg font-medium mb-2">Date:</label>
      <input
        type="date"
        name="date"
        value={formData.date}
        onChange={handleChange}
        className="w-full p-3 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />

      <label className="block text-lg font-medium mb-2">Road:</label>
      <input
        type="text"
        name="road"
        value={formData.road}
        onChange={handleChange}
        className="w-full p-3 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />

      <h3 className="text-xl font-semibold mb-3">Items</h3>
      {formData.items.map((item, index) => (
        <div key={index} className="flex items-center gap-4 mb-4">
          <select
  value={item._id || ""} // Ensure _id is stored and used correctly
  onChange={(e) => handleItemChange(index, "name", e.target.value)}
  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
  required
>
  <option value="">Select Product</option>
  {products.map((product) => (
    <option key={product._id} value={product._id}>
      {product.name}
    </option>
  ))}
</select>



          <input
            type="text"
            placeholder="Unit"
            value={item.unit}
            onChange={(e) => handleItemChange(index, "unit", e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
  type="number"
  placeholder="Rate"
  value={item.rate}  // Make sure rate is used, not some other variable
  onChange={(e) => handleItemChange(index, "rate", parseFloat(e.target.value) || 0)}
  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
  required
/>

          <input
            type="number"
            placeholder="Amount"
            value={item.amount}
            disabled
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="button"
            onClick={() => removeItem(index)}
            className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600"
          >
            ❌
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={addItem}
        className="bg-green-500 text-white p-3 rounded-md hover:bg-green-600 mb-6"
      >
        ➕ Add Item
      </button>

      <h3 className="text-xl font-semibold mb-3">Taxes</h3>
      <label className="block text-lg font-medium mb-2">CGST:</label>
      <input
        type="number"
        name="cgst"
        value={formData.cgst}
        onChange={handleChange}
        className="w-full p-3 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />

      <label className="block text-lg font-medium mb-2">SGST:</label>
      <input
        type="number"
        name="sgst"
        value={formData.sgst}
        onChange={handleChange}
        className="w-full p-3 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />

      <label className="block text-lg font-medium mb-2">IGST:</label>
      <input
        type="number"
        name="igst"
        value={formData.igst}
        onChange={handleChange}
        className="w-full p-3 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />

      <h3 className="text-xl font-semibold mb-4">
        Total Amount: ₹{formData.totalAmount}
      </h3>

      <button
        type="submit"
        className="w-full p-4 bg-blue-500 text-white text-xl font-semibold rounded-md hover:bg-blue-600 transition-all duration-300"
      >
        {id ? "Update" : "Create"} Invoice
      </button>
    </form>
  );
};

export default InvoiceForm;
