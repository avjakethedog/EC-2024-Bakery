import React from 'react';
import { NavLink } from 'react-router-dom';
let logo = require('../../../Assests/Images/logo.png'); // Ensure the path is correct

const KitchenHeader: React.FC = () => {
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
                to="/kitchen/updateorder"
                className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
              >
                UPDATE ORDER
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink 
                to="/kitchen/materialsmanagement"
                className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
              >
                MATERIALS MANAGEMENT
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="d-flex align-items-center">
          <div className="rounded-circle bg-secondary" style={{ width: '40px', height: '40px' }}></div>
          <span className="ms-2 text-secondary">Hi Chef</span>
        </div>
      </div>
    </nav>
  );
}

export default KitchenHeader;
