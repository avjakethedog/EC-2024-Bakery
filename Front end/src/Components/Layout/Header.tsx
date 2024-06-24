import React from "react";
import { NavLink } from "react-router-dom";
let logo = require("../../Assests/Images/logo.png");

function Header() {
  const navStyle = {
    backgroundColor: "#F5F5F5",
    border: "1px solid #000000",
  };

  const liStlye = {
    marginRight: "20px",
  };

  return (
    <div>
      <nav
        className="d-flex navbar navbar-expand-lg bg-body-tertiary row justify-content-space-between"
        style={navStyle}
      >
        <div className="container-fluid">
          <NavLink className="nav-link active" aria-current="page" to="/">
            <img src={logo} style={{ height: "50px" }} className="m-1" />
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item" style={{ marginRight: "20px" }}>
                <NavLink className="nav-link active" aria-current="page" to="/">
                  Home
                </NavLink>
              </li>
              <li className="nav-item dropdown" style={{ marginRight: "20px" }}>
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Menu
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <a className="dropdown-item" href="#">
                      Cake 1
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Cake 2
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Cake 3
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Cake 4
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Cake 5
                    </a>
                  </li>
                </ul>
              </li>
              <li className="nav-item" style={{ marginRight: "100px" }}>
                <a className="nav-link" href="#">
                  About us
                </a>
              </li>
              <li>
                <form
                  className="d-flex"
                  role="search"
                  style={{ marginRight: "700px" }}
                >
                  <input
                    className="form-control me-2"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                  />
                  <button className="btn btn-outline-success" type="submit">
                    Search
                  </button>
                </form>
              </li>
              <li className="nav-item" style={{ marginRight: "20px" }}>
                <NavLink
                  className="nav-link active"
                  aria-current="page"
                  to="/shoppingCart"
                >
                  <i className="bi bi-cart3" style={{ marginLeft: "1px" }}></i>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Header;
