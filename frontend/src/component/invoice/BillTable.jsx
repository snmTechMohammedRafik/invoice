// import React from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { removeBill } from "../redux/billSlice";
// import { useNavigate } from "react-router-dom";

// const BillTable = ({ onEdit }) => {
//   const { bills, loading } = useSelector((state) => state.bills || { bills: [] });
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   if (loading) return <p>Loading...</p>;

//   return (
//     <div className="overflow-x-auto bg-white p-6 rounded-lg shadow-lg">
//       <h2 className="text-2xl font-bold text-center mb-6">Bills List</h2>
//       {bills.length === 0 ? (
//         <p className="text-center text-gray-500">No Bills Available</p>
//       ) : (
//         <table className="min-w-full table-auto border-separate border-spacing-0">
//           <thead className="bg-gray-800 text-white">
//             <tr>
//               <th className="px-6 py-3 text-left">Customer</th>
//               <th className="px-6 py-3 text-left">Bill No</th>
//               <th className="px-6 py-3 text-left">Date</th>
//               <th className="px-6 py-3 text-left">Total</th>
//               <th className="px-6 py-3 text-left">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {bills.map((bill, index) => (
//               <tr
//                 key={bill.id}
//                 className={`${
//                   index % 2 === 0 ? "bg-gray-50" : "bg-white"
//                 } hover:bg-gray-100 transition-all duration-300 ease-in-out`}
//               >
//                 <td className="px-6 py-4">{bill.customerName}</td>
//                 <td className="px-6 py-4">{bill.billNo}</td>
//                 <td className="px-6 py-4">{bill.date}</td>
//                 <td className="px-6 py-4">${bill.totalAmount}</td>
//                 <td className="px-6 py-4">
//                   <button
//                     onClick={() => navigate(`/edit-bill/${bill.id}`)}
//                     className="bg-yellow-500 text-white p-2 rounded-md mr-2 transition-all duration-300 ease-in-out hover:bg-yellow-600"
//                   >
//                     Edit
//                   </button>
//                   <button
//                     onClick={() => dispatch(removeBill(bill.id))}
//                     className="bg-red-500 text-white p-2 rounded-md transition-all duration-300 ease-in-out hover:bg-red-600"
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default BillTable;
