import React from 'react';
import { FaUser, FaLock, FaPhone, FaEnvelope, FaHome } from 'react-icons/fa';
let Background = require("../Assests/Images/background.jpg");

const SignUp: React.FC = () => {
  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-100 py-8 px-4 relative">
      {/* Hình ảnh lớn */}
      <div className="absolute top-0 left-0 w-full h-full">
        <img 
          src={Background} 
          alt="Background" 
          className="object-cover w-full h-full opacity-30" 
        />
      </div>

      <div className="relative z-10 bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        {/* Tiêu đề */}
        <h1 className="text-2xl font-bold mb-6 text-center">Sign Up</h1>

        {/* Form đăng ký */}
        <form>
          <div className="mb-4 flex items-center border border-gray-300 rounded-lg">
            <span className="p-3 text-gray-500"><FaUser /></span>
            <input
              type="text"
              placeholder="Full Name"
              className="w-full px-3 py-2 border-0 focus:outline-none"
            />
          </div>

          <div className="mb-4 flex items-center border border-gray-300 rounded-lg">
            <span className="p-3 text-gray-500"><FaUser /></span>
            <input
              type="text"
              placeholder="Username"
              className="w-full px-3 py-2 border-0 focus:outline-none"
            />
          </div>

          <div className="mb-4 flex items-center border border-gray-300 rounded-lg">
            <span className="p-3 text-gray-500"><FaLock /></span>
            <input
              type="password"
              placeholder="Password"
              className="w-full px-3 py-2 border-0 focus:outline-none"
            />
          </div>

          <div className="mb-4 flex items-center border border-gray-300 rounded-lg">
            <span className="p-3 text-gray-500"><FaPhone /></span>
            <input
              type="text"
              placeholder="Phone"
              className="w-full px-3 py-2 border-0 focus:outline-none"
            />
          </div>

          <div className="mb-4 flex items-center border border-gray-300 rounded-lg">
            <span className="p-3 text-gray-500"><FaHome /></span>
            <input
              type="text"
              placeholder="Address"
              className="w-full px-3 py-2 border-0 focus:outline-none"
            />
          </div>

          <div className="mb-6 flex items-center border border-gray-300 rounded-lg">
            <span className="p-3 text-gray-500"><FaEnvelope /></span>
            <input
              type="email"
              placeholder="Email"
              className="w-full px-3 py-2 border-0 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600"
          >
            Sign Up
          </button>

          <hr className="my-6 border-gray-300" />

          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Already have an account?</span>
            <a href="/login" className="text-orange-500 font-semibold hover:underline">
              Log In
            </a>
          </div>
        </form>
      </div>
    </main>
  );
};

export default SignUp;
