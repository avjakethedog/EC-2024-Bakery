import React from 'react';
import { NavLink } from 'react-router-dom';
let logo = require('../../../Assests/Images/logo.png'); // Ensure the path is correct

const Header: React.FC = () => {
  return (
    <div className="flex justify-between items-center bg-gray-100 p-4 shadow">
      <div className="flex items-center">
        <div className="mr-4">
          <img 
            src={logo} // Replace with the path to your logo
            alt="Logo"
            className="h-21 w-21 md:h-24 md:w-24"
          />
        </div>
        <div className="text-2xl font-bold">MANAGEMENT DEPARTMENT</div>
      </div>
      <div className="flex space-x-8">
        <NavLink 
          to="/admin/orderlist"
          className="text-gray-700 hover:text-blue-500 hover:underline"
        >
          ORDER LIST
        </NavLink>
        <NavLink 
          to="/admin/revenue"
          className="text-gray-700 hover:text-blue-500 hover:underline"
        >
          REVENUE
        </NavLink>
        <NavLink 
          to="/admin/orderhistory"
          className="text-gray-700 hover:text-blue-500 hover:underline"
        >
          ORDER HISTORY
        </NavLink>
        <NavLink 
          to="/admin/productioncost"
          className="text-gray-700 hover:text-blue-500 hover:underline"
        >
          PRODUCTION COST
        </NavLink>
      </div>
      <div className="flex items-center">
        <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
        <span className="ml-2 text-gray-700">Hi User</span>
      </div>
    </div>
  );
}

export default Header;
