import React from "react";
import { menuItemModel } from "../../../Interfaces";
import { Link } from "react-router-dom";
import { useState } from "react";
import { MiniLoader } from "../Common";

interface Props {
  menuItem: menuItemModel;
}

function MenuItemCard(props: Props) {
  const [isAddingToCart, setIsAddingToCart] = useState<boolean>(false);
  const [cart, setCart] = useState<menuItemModel[]>([]); // State để lưu trữ giỏ hàng

  const handleAddToCart = (menuItem: menuItemModel) => {
    setIsAddingToCart(true);

    setTimeout(() => {
      setCart([...cart, menuItem]);
      setIsAddingToCart(false);
      console.log("Sản phẩm đã được thêm vào giỏ hàng: ", menuItem);
    }, 1000);
  };

  return (
    <div className="d-flex col-md-4 col-12 p-4">
      <div
        className="card"
        style={{ boxShadow: "0 1px 7px 0 rgb(0 0 0 / 50%)" }}
      >
        <div className="card-body pt-2">
          <div className="row col-10 offset-1 p-4">
            <Link to={`/menuItemDetails/${props.menuItem.id}`}>
              <img
                src={props.menuItem.image}
                style={{ borderRadius: "50%" }}
                alt=""
                className="w-100 mt-5 image-box"
              />
            </Link>
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
            &nbsp; {props.menuItem.specialTag}
          </i>

          {isAddingToCart ? (
            <div
              style={{
                position: "absolute",
                top: "15px",
                right: "15px",
              }}
            >
              <MiniLoader />
            </div>
          ) : (
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
              onClick={() => handleAddToCart(props.menuItem)}
            ></i>
          )}
          <div className="text-center">
            <Link
              to={`/menuItemDetails/${props.menuItem.id}`}
              style={{ textDecoration: "none", color: "green" }}
            >
              <p className="card-title m-0 text-success fs-3">
                {props.menuItem.name}
              </p>
            </Link>
            <p className="badge bg-secondary" style={{ fontSize: "12px" }}>
              {props.menuItem.category}
            </p>
            <p className="card-text" style={{ textAlign: "center" }}>
              {props.menuItem.description}
            </p>
            <div className="row text-center">
              <h4>{props.menuItem.price}</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MenuItemCard;
