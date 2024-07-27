import React from 'react';
import { FaFacebook, FaInstagram } from 'react-icons/fa';
let logo = require('../../Assests/Images/logo.png');

const Footer: React.FC = () => {
  return (
    <footer className="bg-orange-500 text-black py-8 px-4 relative">
      <div className="container pl-4 md:pl-8 mx-auto flex flex-wrap justify-between pt-4 space-y-6 md:space-y-0">
        {/* Column 1: Contact Information */}
        <div className="w-full md:w-1/4 mb-6 md:mb-0">
          <img src={logo} alt="Logo" className="h-20 w-20 md:h-24 md:w-24" />
          <p className="mb-2 text-sm">227 Nguyen Van Cu</p>
          <p className="mb-2 text-sm">Dist. 5, HCMC, Vietnam</p>
          <p className="mb-2 text-sm">alt.f4.21clc@gmail.com</p>
          <p className="mb-2 text-sm">+84-12-345678</p>
        </div>
        
        {/* Column 2: Account */}
        <div className="w-full md:w-1/4 mb-6 md:mb-0">
          <h2 className="text-lg font-semibold mb-4">Account</h2>
          <ul className="space-y-2">
            <li><a href="#" className="text-sm hover:text-gray-200">My account</a></li>
            <li><a href="#" className="text-sm hover:text-gray-200">Login/Sign up</a></li>
            <li><a href="#" className="text-sm hover:text-gray-200">Cart</a></li>
          </ul>
        </div>
        
        {/* Column 3: Support */}
        <div className="w-full md:w-1/4 mb-6 md:mb-0">
          <h2 className="text-lg font-semibold mb-4">Support</h2>
          <ul className="space-y-2">
            <li><a href="#" className="text-sm hover:text-gray-200">Privacy Policy</a></li>
            <li><a href="#" className="text-sm hover:text-gray-200">Term Of Use</a></li>
            <li><a href="#" className="text-sm hover:text-gray-200">FAQ</a></li>
            <li><a href="#" className="text-sm hover:text-gray-200">Contact</a></li>
          </ul>
        </div>
        
        {/* Column 4: Follow Us */}
        <div className="w-full md:w-1/4">
          <h2 className="text-lg font-semibold mb-4">Follow Us</h2>
          <div className="flex space-x-4">
            <a href="#" className="text-white hover:text-gray-200">
              <FaFacebook size={24} />
            </a>
            <a href="#" className="text-white hover:text-gray-200">
              <FaInstagram size={24} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
