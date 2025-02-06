// App.jsx
import React, { useState } from "react";
import Sidebar from "./component/sidebar/Sidebar";
import Product from "./component/product/index";
import { FaBars } from "react-icons/fa";
import { Route, Routes, useLocation } from "react-router-dom";
// import InvoicePage from "./component/invoice/index";
import LoginForm from "./component/login";
import Signin from "./component/signin";
import { ToastContainer } from "react-toastify";
import ProductTable from "./component/product/ProductTable";
import ProductForm from "./component/product/ProductForm";
import CompanyTable from "./component/company/CompanyTable";
import CompanyForm from "./component/company/CompanyForm";
import InvoiceForm from "./component/invoice/InvoiceForm";
import InvoiceTable from "./component/invoice/InvoiceTable";

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const hideElementsRoutes = ["/", "/signin"];
  const shouldShowSidebar = !hideElementsRoutes.includes(location.pathname);
  const shouldShowHeader = !hideElementsRoutes.includes(location.pathname);

  return (
    <>
      <ToastContainer />
      <div className="relative min-h-screen bg-gray-100">
        {shouldShowHeader && (
          <header className="bg-white shadow-md p-4">
            <button onClick={toggleSidebar} className="text-2xl">
              <FaBars />
            </button>
          </header>
        )}
        {shouldShowSidebar && (
          <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        )}
        <main className="p-4">
          <Routes>
            <Route path="/" element={<LoginForm />} />
            <Route path="/signin" element={<Signin />} />
            {/* <Route path="/invoice" element={<InvoicePage />} /> */}
            <Route path="/products" element={<ProductTable />} />
            <Route path="/products/new" element={<ProductForm />} />
            <Route path="/products/:id" element={<ProductForm />} />

            <Route path="/companies" element={<CompanyTable />} />
            <Route path="/companies/new" element={<CompanyForm />} />
            <Route path="/companies/:id" element={<CompanyForm />} />

            <Route path="/invoice" element={<InvoiceTable />} />
            <Route path="/createInvoice" element={<InvoiceForm />} />
            <Route path="/editInvoice/:id" element={<InvoiceForm />} />
          </Routes>
        </main>
      </div>
    </>
  );
};

export default App;
