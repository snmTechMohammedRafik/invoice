import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/authSlice";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import imglogo from "../../assets/img/logo.webp"

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, message, user, token } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (error) {
      toast.error(error.message || "Login failed");
    }
    if (message) {
      toast.success(message);
    }
    if (user && token) {
      toast.success("Login successful!");
      navigate("/invoice"); // Redirect to the invoice page on success
    }
  }, [error, message, user, token, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Side - Image */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 relative">
        <img
          src={imglogo}
          alt="Login Illustration"
          className="w-full h-full"
        />
        
        
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex items-center justify-center w-full lg:w-1/2 p-8 bg-gray-100">
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
            Welcome Back 👋
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label className="block text-gray-700 font-medium">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 rounded-lg bg-gray-100 border border-gray-300 text-gray-700 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                placeholder="Enter your email"
                required
              />
            </div>

            {/* Password Field */}
            <div className="relative">
              <label className="block text-gray-700 font-medium">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 rounded-lg bg-gray-100 border border-gray-300 text-gray-700 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                className="absolute right-3 top-10 text-gray-600 text-lg"
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
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          {/* Extra Links */}
          <div className="mt-4 text-center">
            <p className="text-gray-600 text-sm">
              Don't have an account?{" "}
              <a href="/signin" className="text-indigo-500 hover:underline">
                Sign up
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
