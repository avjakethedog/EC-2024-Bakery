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
    <header className="d-flex justify-content-between align-items-center p-3 border-bottom bg-white">
      <div className="d-flex align-items-center">
        <img src={logo} alt="Logo" className="img-fluid" style={{ height: '80px', width: '80px' }} />
        <nav className="d-none d-md-flex align-items-center ms-3">
          <a href="#" className="nav-link text-dark d-flex align-items-center me-3" style={{ textDecoration: 'none' }}>Home</a>
          <div className="position-relative me-3" ref={menuRef}>
            <button
              onClick={toggleMenu}
              className="btn btn-link text-dark d-flex align-items-center"
              style={{ lineHeight: '1.5', textDecoration: 'none' }} // Đảm bảo không có gạch chân
            >
              <span>Menu</span>
              <svg
                className="w-5 h-5 ms-2"
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
              <div className="position-absolute left-0 mt-2 w-48 bg-white border rounded shadow-lg">
                <a href="#" className="d-block px-4 py-2 text-dark hover:bg-light" style={{ textDecoration: 'none' }}>Cake 1</a>
                <a href="#" className="d-block px-4 py-2 text-dark hover:bg-light" style={{ textDecoration: 'none' }}>Cake 2</a>
                <a href="#" className="d-block px-4 py-2 text-dark hover:bg-light" style={{ textDecoration: 'none' }}>Cake 3</a>
                <a href="#" className="d-block px-4 py-2 text-dark hover:bg-light" style={{ textDecoration: 'none' }}>Cake 4</a>
                <a href="#" className="d-block px-4 py-2 text-dark hover:bg-light" style={{ textDecoration: 'none' }}>Cake 5</a>
              </div>
            )}
          </div>
          <a href="#" className="nav-link text-dark d-flex align-items-center" style={{ textDecoration: 'none' }}>About Us</a>
        </nav>
      </div>
      <div className="d-flex align-items-center">
        <div className="position-relative me-3">
          <input
            type="text"
            placeholder="Search for Food items"
            className="form-control rounded-pill ps-5"
          />
          <span className="position-absolute top-50 start-0 translate-middle-y ps-3 text-secondary">
            <FaSearch />
          </span>
        </div>
        <div className="d-none d-md-flex align-items-center me-3">
          <div className="bg-secondary rounded-circle h-8 w-8 d-flex justify-content-center align-items-center">
            {/* Placeholder for user avatar */}
          </div>
          <span className="ms-2">Hi User</span>
        </div>
        <span className="fs-4 me-3">
          <FaShoppingCart />
        </span>
        <span className="fs-4">
          <FaClipboardList />
        </span>
      </div>
    </header>
  );
};

export default Header;
