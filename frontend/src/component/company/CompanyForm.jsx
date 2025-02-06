import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addCompany, modifyCompany, fetchCompanyById } from '../redux/companySlice';
import { useNavigate, useParams } from 'react-router-dom';

const CompanyForm = () => {
  const [companyName, setCompanyName] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { company } = useSelector((state) => state.company);

  // Reset the form when switching between create and edit
  useEffect(() => {
    if (id) {
      dispatch(fetchCompanyById(id));
    } else {
      setCompanyName('');  // Reset the form fields when creating a new company
      setOwnerName('');
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (company) {
      setCompanyName(company.data.companyName);
      setOwnerName(company.data.ownerName);
    }
  }, [company]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const companyData = { companyName, ownerName };

    if (id) {
      dispatch(modifyCompany({ id, companyData }));
    } else {
      dispatch(addCompany(companyData));
    }

    // Reset the form fields after submission
    setCompanyName('');
    setOwnerName('');

    // Redirect to the companies list after submission
    navigate('/companies');
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-6">{id ? 'Update Company' : 'Create Company'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Company Name</label>
          <input
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Owner Name</label>
          <input
            type="text"
            value={ownerName}
            onChange={(e) => setOwnerName(e.target.value)}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
        >
          {id ? 'Update Company' : 'Create Company'}
        </button>
      </form>
    </div>
  );
};

export default CompanyForm;
