import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCompanies, removeCompany } from '../redux/companySlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaEdit, FaTrashAlt } from 'react-icons/fa'; // Importing icons

const CompanyTable = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { companies, loading, error } = useSelector((state) => state.company);

  useEffect(() => {
    dispatch(fetchCompanies());
  }, [dispatch]);

  const handleEdit = (id) => {
    navigate(`/companies/${id}`);
  };

  const handleDelete = (id) => {
    dispatch(removeCompany(id));
    toast.success('Company deleted');
  };

  if (loading) return <div>Loading...</div>;
  if (error) toast.error(error.message);

  return (
    <div className="overflow-x-auto bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Company List
      </h2>
      <button
        onClick={() => navigate('/companies/new')}
        className="bg-gradient-to-r from-teal-500 to-blue-600 text-white px-4 py-2 rounded-md mb-4 hover:from-blue-600 hover:to-teal-500 transition-all duration-300"
      >
        Add Company
      </button>

      {companies.length === 0 ? (
        <p className="text-center text-gray-500">No companies available</p>
      ) : (
        <table className="min-w-full table-auto divide-y divide-gray-200">
          <thead className="bg-gray-200 text-gray-800">
            <tr>
              <th className="px-6 py-3 text-left">Company Name</th>
              <th className="px-6 py-3 text-left">Owner Name</th>
              <th className="px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {companies.map((company, index) => (
              <tr
                key={company._id}
                className={`${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50"
                } hover:bg-gray-200 transition-all duration-300`}
              >
                <td className="px-6 py-3 text-gray-700">{company.companyName}</td>
                <td className="px-6 py-3 text-gray-700">{company.ownerName}</td>
                <td className="px-6 py-3 space-x-2">
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-all duration-300"
                    onClick={() => handleEdit(company._id)} // ✅ Use `_id`
                  >
                    <FaEdit className="inline-block mr-2" />
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-all duration-300"
                    onClick={() => handleDelete(company._id)} // ✅ Use `_id`
                  >
                    <FaTrashAlt className="inline-block mr-2" />
                    Delete
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

export default CompanyTable;
