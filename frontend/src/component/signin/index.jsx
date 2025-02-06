import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../redux/signInSlice';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Signin = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [organizationName, setOrganizationName] = useState('');
  const [typesOfWork, setTypesOfWork] = useState('');
  const [address, setAddress] = useState({
    street: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, message, user } = useSelector((state) => state.signIn);

  useEffect(() => {
    if (error) {
      toast.error(error.message || 'Registration failed');
    }
    if (message) {
      toast.success(message);
    }
    if (user) {
      toast.success('Registration successful!');
      navigate('/');
    }
  }, [error, message, user, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
      name,
      email,
      phone,
      password,
      isAdmin,
      organizationName,
      typesOfWork: typesOfWork.split(','),
      address,
    };
    dispatch(register(userData));
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Side - Image */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 relative">
        <img
          src="https://source.unsplash.com/800x600/?team,office"
          alt="Sign Up Illustration"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Right Side - Signup Form */}
      <div className="flex items-center justify-center w-full lg:w-1/2 p-8 bg-gray-100">
        <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
            Create an Account 🚀
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 rounded-lg bg-gray-100 border border-gray-300 text-gray-700 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              required
            />
            {/* Email */}
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 rounded-lg bg-gray-100 border border-gray-300 text-gray-700 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              required
            />
            {/* Phone */}
            <input
              type="text"
              placeholder="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full p-3 rounded-lg bg-gray-100 border border-gray-300 text-gray-700 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              required
            />
            {/* Organization Name */}
            <input
              type="text"
              placeholder="Organization Name"
              value={organizationName}
              onChange={(e) => setOrganizationName(e.target.value)}
              className="w-full p-3 rounded-lg bg-gray-100 border border-gray-300 text-gray-700 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              required
            />
            {/* Types of Work */}
            <input
              type="text"
              placeholder="Types of Work (comma separated)"
              value={typesOfWork}
              onChange={(e) => setTypesOfWork(e.target.value)}
              className="w-full p-3 rounded-lg bg-gray-100 border border-gray-300 text-gray-700 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              required
            />
            {/* Address Fields */}
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Street"
                value={address.street}
                onChange={(e) => setAddress({ ...address, street: e.target.value })}
                className="p-3 rounded-lg bg-gray-100 border border-gray-300 text-gray-700 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                required
              />
              <input
                type="text"
                placeholder="City"
                value={address.city}
                onChange={(e) => setAddress({ ...address, city: e.target.value })}
                className="p-3 rounded-lg bg-gray-100 border border-gray-300 text-gray-700 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                required
              />
              <input
                type="text"
                placeholder="State"
                value={address.state}
                onChange={(e) => setAddress({ ...address, state: e.target.value })}
                className="p-3 rounded-lg bg-gray-100 border border-gray-300 text-gray-700 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                required
              />
              <input
                type="text"
                placeholder="Postal Code"
                value={address.postalCode}
                onChange={(e) => setAddress({ ...address, postalCode: e.target.value })}
                className="p-3 rounded-lg bg-gray-100 border border-gray-300 text-gray-700 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                required
              />
              <input
                type="text"
                placeholder="Country"
                value={address.country}
                onChange={(e) => setAddress({ ...address, country: e.target.value })}
                className="p-3 rounded-lg bg-gray-100 border border-gray-300 text-gray-700 focus:ring-2 focus:ring-indigo-400 focus:outline-none col-span-2"
                required
              />
            </div>
            {/* Password Field */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 rounded-lg bg-gray-100 border border-gray-300 text-gray-700 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                required
              />
              <button
                type="button"
                className="absolute right-3 top-3 text-gray-600 text-lg"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold py-3 rounded-lg shadow-md hover:from-pink-500 hover:to-purple-600 transition-all duration-300 ease-in-out"
              disabled={loading}
            >
              {loading ? 'Registering...' : 'Sign Up'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signin;
