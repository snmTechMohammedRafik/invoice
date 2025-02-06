import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBills, removeBill } from "../redux/billSlice";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrashAlt, FaFilePdf } from "react-icons/fa"; // Importing icons

const InvoiceTable = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { bills, loading } = useSelector((state) => state.bills);

  useEffect(() => {
    dispatch(fetchBills());
  }, [dispatch]);

  const handleDelete = (_id) => {
    if (window.confirm("Are you sure you want to delete this bill?")) {
      dispatch(removeBill(_id));
    }
  };

  const handleDownloadPDF = (id) => {
    const link = document.createElement("a");
    link.href = `http://localhost:5000/api/bills/${id}/pdf`;
    link.download = `Invoice-${id}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  return (
    <div className="overflow-x-auto bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Invoice List
      </h2>
      <button
        onClick={() => navigate("/createInvoice")}
        className="bg-gradient-to-r from-teal-500 to-blue-600 text-white px-4 py-2 rounded-md mb-4 hover:from-blue-600 hover:to-teal-500 transition-all duration-300"
      >
        Create Invoice
      </button>

      {loading && <p>Loading...</p>}

      {bills.length === 0 ? (
        <p className="text-center text-gray-500">No invoices available</p>
      ) : (
        <table className="min-w-full table-auto divide-y divide-gray-200">
          <thead className="bg-gray-200 text-gray-800">
            <tr>
              <th className="px-6 py-3 text-left">Customer Name</th>
              <th className="px-6 py-3 text-left">Bill No</th>
              <th className="px-6 py-3 text-left">Total Amount</th>
              <th className="px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bills.map((bill, index) => (
              <tr
                key={bill._id}
                className={`${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50"
                } hover:bg-gray-200 transition-all duration-300`}
              >
                <td className="px-6 py-3 text-gray-700">{bill.customerName}</td>
                <td className="px-6 py-3 text-gray-700">{bill.billNo}</td>
                <td className="px-6 py-3 text-gray-700">₹{bill.totalAmount}</td>
                <td className="px-6 py-3 space-x-2">
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-all duration-300"
                    onClick={() => navigate(`/editInvoice/${bill._id}`)}
                  >
                    <FaEdit className="inline-block mr-2" />
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-all duration-300"
                    onClick={() => handleDelete(bill._id)}
                  >
                    <FaTrashAlt className="inline-block mr-2" />
                    Delete
                  </button>
                  <button
                    className="bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-900 transition-all duration-300"
                    onClick={() => handleDownloadPDF(bill._id)}
                  >
                    <FaFilePdf className="inline-block mr-2" />
                    Download PDF
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default InvoiceTable;
