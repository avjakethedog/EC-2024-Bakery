import React from 'react';
import { FaUser, FaLock } from 'react-icons/fa';
let Background=require("../Assests/Images/background.jpg")
const LogIn: React.FC = () => {
  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-100 py-8 px-4">
      {/* Hình ảnh lớn (có thể thay thế bằng hình ảnh thực tế) */}
      <div className="absolute top-0 left-0 w-full h-full">
        <img 
          src={Background} 
          alt="Background" 
          className="object-cover w-full h-full opacity-30" 
        />
      </div>

      <div className="relative z-10 bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        {/* Tiêu đề */}
        <h1 className="text-2xl font-bold mb-6 text-center">Log In</h1>

        {/* Form đăng nhập */}
        <form>
          <div className="mb-4 flex items-center border border-gray-300 rounded-lg">
            <span className="p-3 text-gray-500"><FaUser /></span>
            <input
              type="text"
              placeholder="Username"
              className="w-full px-3 py-2 border-0 focus:outline-none"
            />
          </div>

          <div className="mb-6 flex items-center border border-gray-300 rounded-lg">
            <span className="p-3 text-gray-500"><FaLock /></span>
            <input
              type="password"
              placeholder="Password"
              className="w-full px-3 py-2 border-0 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600"
          >
            Log In
          </button>

          <hr className="my-6 border-gray-300" />

          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Don't have an account?</span>
            <a href="/signup" className="text-orange-500 font-semibold hover:underline">
              Sign Up
            </a>
          </div>
        </form>
      </div>
    </main>
  );
};

export default LogIn;
