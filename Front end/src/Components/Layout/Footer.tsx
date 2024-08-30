import React from 'react';
import { FaFacebook, FaInstagram } from 'react-icons/fa';
let logo = require('../../Assests/Images/logo.png');

// CSS-in-JS (inline styles) hoặc CSS Module có thể được sử dụng thay thế
const footerStyle = {
  backgroundColor: '#f57c00', // Màu cam
  color: '#000', // Màu chữ đen
  borderTop: '2px solid black', // Viền đen ở trên
  padding: '1rem 0.75rem'
};

const linkStyle = {
  color: '#000', // Màu chữ đen cho các liên kết
  textDecoration: 'none' // Loại bỏ gạch chân
};

const Footer: React.FC = () => {
  return (
    <footer style={footerStyle}>
      <div className="container">
        <div className="row justify-content-center">
          {/* Column 1: Contact Information */}
          <div className="col-12 col-md-3 mb-4 mb-md-0 text-center">
            <img src={logo} alt="Logo" className="img-fluid mb-3" style={{ height: '200px' }} />
            <p className="mb-2">227 Nguyen Van Cu</p>
            <p className="mb-2">Dist. 5, HCMC, Vietnam</p>
            <p className="mb-2">alt.f4.21clc@gmail.com</p>
            <p className="mb-2">+84-12-345678</p>
          </div>
          
          {/* Column 2: Account */}
          <div className="col-12 col-md-3 mb-4 mb-md-0 text-center">
            <h5 className="mb-3">Account</h5>
            <ul className="list-unstyled">
              <li><a href="#" style={linkStyle}>My account</a></li>
              <li><a href="#" style={linkStyle}>Login/Sign up</a></li>
              <li><a href="#" style={linkStyle}>Cart</a></li>
            </ul>
          </div>
          
          {/* Column 3: Support */}
          <div className="col-12 col-md-3 mb-4 mb-md-0 text-center">
            <h5 className="mb-3">Support</h5>
            <ul className="list-unstyled">
              <li><a href="#" style={linkStyle}>Privacy Policy</a></li>
              <li><a href="#" style={linkStyle}>Term Of Use</a></li>
              <li><a href="#" style={linkStyle}>FAQ</a></li>
              <li><a href="#" style={linkStyle}>Contact</a></li>
            </ul>
          </div>
          
          {/* Column 4: Follow Us */}
          <div className="col-12 col-md-3 text-center mb-4 mb-md-0">
            <h5 className="mb-3">Follow Us</h5>
            <div className="d-flex justify-content-center">
              <a href="#" className="text-dark me-3">
                <FaFacebook size={24} />
              </a>
              <a href="#" className="text-dark">
                <FaInstagram size={24} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
