import React from 'react';
import { NavLink } from 'react-router-dom';
let logo = require('../../../Assests/Images/logo.png'); // Ensure the path is correct

const Header: React.FC = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow p-3">
      <div className="container-fluid">
        <div className="d-flex align-items-center">
          <img 
            src={logo}
            alt="Logo"
            className="me-3"
            style={{ height: '50px', width: '50px' }} // Adjust size as needed
          />
          <span className="navbar-brand mb-0 h1">MANAGEMENT DEPARTMENT</span>
        </div>
        <div className="collapse navbar-collapse justify-content-center">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink 
                to="/admin/orderlist"
                className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
              >
                ORDER LIST
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink 
                to="/admin/ordersinday"
                className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
              >
                ORDERS IN DAY
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink 
                to="/admin/revenue"
                className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
              >
                REVENUE
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink 
                to="/admin/productioncost"
                className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
              >
                PRODUCTION COST
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="d-flex align-items-center">
          <div className="rounded-circle bg-secondary" style={{ width: '40px', height: '40px' }}></div>
          <span className="ms-2 text-secondary">Hi User</span>
        </div>
      </div>
    </nav>
  );
}

export default Header;
