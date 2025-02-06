import React from 'react';
import { FaBoxes, FaClipboardList, FaBuilding, FaSignOutAlt, FaHome } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const navigate = useNavigate();

  const handleProductRedirect = () => {
    navigate('/products'); // Navigate to the products page
  };
  const handleInvoiceRedirect = () => {
    navigate('/invoice'); // Navigate to the invoice page
  };

  const handleCompanyRedirect = () => {
    navigate('/companies'); // Navigate to the companies page
  };
  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <div
      className={`fixed top-0 left-0 h-full w-64 bg-gray-800 text-white transform ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } transition-transform duration-300 ease-in-out shadow-lg z-50`}
    >
      <button
        className="absolute top-4 right-4 text-2xl text-white hover:text-gray-400 focus:outline-none"
        onClick={toggleSidebar}
      >
        &times;
      </button>
      <nav className="mt-16">
        <ul>
          <li className="flex items-center p-4 hover:bg-gray-700 rounded-md transition-all duration-300">
            <FaClipboardList className="mr-3 text-xl" />
            <button
              onClick={handleInvoiceRedirect}
              className="text-white text-lg font-medium hover:text-gray-300 transition-all duration-300"
            >
              Invoices
            </button>
          </li>
          <li className="flex items-center p-4 hover:bg-gray-700 rounded-md transition-all duration-300">
            <FaBoxes className="mr-3 text-xl" />
            <button
              onClick={handleProductRedirect}
              className="text-white text-lg font-medium hover:text-gray-300 transition-all duration-300"
            >
              Products
            </button>
          </li>
          <li className="flex items-center p-4 hover:bg-gray-700 rounded-md transition-all duration-300">
            <FaBuilding className="mr-3 text-xl" />
            <button
              onClick={handleCompanyRedirect}
              className="text-white text-lg font-medium hover:text-gray-300 transition-all duration-300"
            >
              Companies
            </button>
          </li>
          <li className="flex items-center p-4 hover:bg-gray-700 rounded-md transition-all duration-300">
            <FaSignOutAlt className="mr-3 text-xl" />
            <button
              onClick={handleLogout}
              className="text-white text-lg font-medium hover:text-gray-300 transition-all duration-300"
            >
              Logout
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
