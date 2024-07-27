import React, { useState, useRef, useEffect } from 'react';
import { FaSearch, FaShoppingCart, FaClipboardList } from 'react-icons/fa';
let logo = require('../../Assests/Images/logo.png');

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="flex justify-between items-center p-4 border-b border-gray-300 bg-white">
      <div className="flex items-center space-x-10">
        <img src={logo} alt="Logo" className="h-21 w-21 md:h-24 md:w-24" />
        <nav className="hidden md:flex space-x-10">
          <a href="#" className="text-black hover:text-blue-600">Home</a>
          <div className="relative" ref={menuRef}>
            <button
              onClick={toggleMenu}
              className="flex items-center space-x-1 text-black hover:text-blue-600"
            >
              <span>Menu</span>
              <svg
                className="w-5 h-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M6.293 7.293a1 1 0 011.414 0L10 8.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            {isMenuOpen && (
              <div className="absolute left-0 mt-2 w-48 origin-top-left rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                <a href="#" className="block px-4 py-2 text-base text-gray-700 hover:bg-gray-100">Cake 1</a>
                <a href="#" className="block px-4 py-2 text-base text-gray-700 hover:bg-gray-100">Cake 2</a>
                <a href="#" className="block px-4 py-2 text-base text-gray-700 hover:bg-gray-100">Cake 3</a>
                <a href="#" className="block px-4 py-2 text-base text-gray-700 hover:bg-gray-100">Cake 4</a>
                <a href="#" className="block px-4 py-2 text-base text-gray-700 hover:bg-gray-100">Cake 5</a>
              </div>
            )}
          </div>
          <a href="#" className="text-black hover:text-blue-600">About Us</a>
        </nav>
      </div>
      <div className="flex items-center space-x-10">
        <div className="relative flex-grow max-w-lg"> {/* Đặt max-width lớn hơn */}
          <input
            type="text"
            placeholder="Search for Food items"
            className="border rounded-full px-4 py-2 pl-10 w-full"
          />
          <span className="absolute left-2 top-3 text-gray-500">
            <FaSearch />
          </span>
        </div>
        <div className="hidden md:flex items-center space-x-2">
          <div className="bg-gray-300 rounded-full h-8 w-8 md:h-10 md:w-10"></div>
          <span>Hi User</span>
        </div>
        <span className="text-xl md:text-2xl">
          <FaShoppingCart />
        </span>
        <span className="text-xl md:text-2xl">
          <FaClipboardList />
        </span>
      </div>
    </header>
  );
};

export default Header;
