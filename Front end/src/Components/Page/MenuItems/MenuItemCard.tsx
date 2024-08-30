import React from "react";

function MenuItemCard() {
  return (
    <div className="d-flex col-md-4 col-12 p-4 ">
      <div
        className="card"
        style={{ boxShadow: "0 1px 7px 0 rgb(0 0 0 / 50%)" }}
      >
        <div className="card-body pt-2">
          <div className="row col-10 offset-1 p-4">
            <img
              src="https://via.placeholder.com/150"
              style={{ borderRadius: "50%" }}
              alt=""
              className="w-100 mt-5 image-box"
            />
          </div>
          <i
            className="bi bi-star btn btn-success"
            style={{
              position: "absolute",
              top: "15px",
              left: "15px",
              padding: "5px 10px",
              borderRadius: "3px",
              outline: "none !important",
              cursor: "pointer",
            }}
          >
            &nbsp; SPECIAL
          </i>
          <i
            className="bi bi-cart btn btn-outline-secondary"
            style={{
              position: "absolute",
              top: "15px",
              right: "15px",
              padding: "5px 10px",
              borderRadius: "3px",
              outline: "none !important",
              cursor: "pointer",
            }}
          ></i>
          <div className="text-center">
            <p className="card-title m-0 text-success fs-3">name</p>
            <p className="badge bg-secondary" style={{ fontSize: "12px" }}>
              category
            </p>
            <p className="card-text" style={{ textAlign: "center" }}>
              Description
            </p>
            <div className="row text-center">
              <h4>$10</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MenuItemCard;