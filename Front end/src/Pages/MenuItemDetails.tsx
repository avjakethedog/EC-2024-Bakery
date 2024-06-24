import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { menuItemModel } from "../Interfaces";
import { MainLoader } from "../Components/Page/Common";

function MenuItemDetails() {
  const { id } = useParams();
  console.log("ID from URL:", id);

  const menuItems: menuItemModel[] = [
    {
      id: 1,
      name: "Bánh Pizza",
      description: "Bánh Được Làm Từ Bột",
      specialTag: "",
      category: "Bánh Nướng",
      price: 200,
      image:
        "https://bizweb.dktcdn.net/100/449/089/products/pizza-xuc-xich-pho-mai-vuong-50w.jpg?v=1648636728243",
    },
    {
      id: 2,
      name: "Bánh Su Kem",
      description: "Bánh Được Làm Từ Bột",
      specialTag: "Best Seller",
      category: "Bánh Nướng",
      price: 200,
      image:
        "https://bizweb.dktcdn.net/thumb/1024x1024/100/487/455/products/choux-1695873488314.jpg?v=1695873492293",
    },
    {
      id: 3,
      name: "Bánh Bông Lan",
      description: "Bánh Làm Từ Bột",
      specialTag: "Best Seller",
      category: "Bánh Nướng",
      price: 200,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6vRtpZi4NzBo31F_PRnBmV8EREJUzqxE8Lw&s",
    },
    {
      id: 4,
      name: "Bánh Tart",
      description: "Bánh Làm Từ Bột",
      specialTag: "Special",
      category: "Bánh Nướng",
      price: 200,
      image:
        "https://www.huongnghiepaau.com/wp-content/uploads/2018/05/6ce8174e82984e94a7a98889b7c17e32.jpg",
    },
    {
      id: 5,
      name: "Bánh Phô Mai Nướng",
      description: "Bánh Làm Từ Bột",
      specialTag: "",
      category: "Bánh Nướng",
      price: 200,
      image:
        "https://afamilycdn.com/150157425591193600/2021/4/3/giphy-16174384948161640949221.gif",
    },
    {
      id: 6,
      name: "Bánh Quy",
      description: "Bánh Làm Từ Bột",
      specialTag: "",
      category: "Bánh Nướng",
      price: 200,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTb-91Modji559H90JYL1eyjHtgt7xn7zv1Ag&s",
    },
    {
      id: 7,
      name: "Bánh Donut",
      description: "Bánh Làm Từ Bột",
      specialTag: "",
      category: "Bánh Nướng",
      price: 200,
      image:
        "https://cdn.tgdd.vn/Files/2021/07/28/1371385/cach-lam-banh-donut-nuong-va-chien-cuc-ngon-va-don-gian-ai-cung-lam-duoc-202112301055414590.jpg",
    },
    {
      id: 8,
      name: "Bánh Sừng Bò",
      description: "Bánh Làm Từ Bột",
      specialTag: "Best Seller",
      category: "Bánh Nướng",
      price: 200,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkKcTTGOo9SHmxeB9sOT2FW3sVtLZtGZNhRg&s",
    },
  ];

  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isAddingToCart, setIsAddingToCart] = useState<boolean>(false);
  const [cart, setCart] = useState<menuItemModel[]>([]); // State để lưu trữ giỏ hàng
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (id) {
      const numericId = parseInt(id, 10);
      const menuItem = menuItems.find((item) => item.id === numericId);

      if (menuItem) {
        setTotalPrice(menuItem.price * quantity);
      }
    }
  }, [id, quantity]);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 300);
  }, []);

  if (!id) {
    return <div>Product not found</div>;
  }

  const numericId = parseInt(id, 10);
  if (isNaN(numericId)) {
    return <div>Product not found</div>;
  }

  const menuItem = menuItems.find((item) => item.id === numericId);
  console.log("Menu Item found:", menuItem);

  if (!menuItem) {
    return <div>Product not found</div>;
  }

  const handleQuantity = (counter: number) => {
    let newQuantity = quantity + counter;
    if (newQuantity == 0) {
      newQuantity = 1;
    }
    setQuantity(newQuantity);
    return;
  };

  const handleAddToCart = (menuItem: menuItemModel) => {
    setIsAddingToCart(true);

    setTimeout(() => {
      setCart([...cart, menuItem]);
      setIsAddingToCart(false);
      console.log("Sản phẩm đã được thêm vào giỏ hàng: ", menuItem);
    }, 1000);
  };

  if (isLoading) {
    return <MainLoader />;
  }

  return (
    <div className="container pt-4 pt-md-5">
      <div className="row align-items-center">
        <div className="col-md-7">
          <h2 className="text-success">{menuItem.name}</h2>
          <span className="d-block mb-2">
            <span
              className="badge text-bg-dark pt-2"
              style={{ height: "40px", fontSize: "20px" }}
            >
              {menuItem.category}
            </span>
            <span
              className="badge text-bg-light pt-2 ms-2"
              style={{ height: "40px", fontSize: "20px" }}
            >
              {menuItem.specialTag}
            </span>
          </span>
          <p style={{ fontSize: "20px" }} className="pt-2">
            {menuItem.description}
          </p>
          <div className="d-flex align-items-center mb-2">
            <span className="h3 me-3">{totalPrice}$</span>
            <div
              className="pb-2 p-3"
              style={{ border: "1px solid #333", borderRadius: "30px" }}
            >
              <i
                className="bi bi-dash p-1"
                style={{ fontSize: "25px", cursor: "pointer" }}
                onClick={() => {
                  handleQuantity(-1);
                }}
              />
              <span className="h3 mt-3 px-3">{quantity}</span>
              <i
                className="bi bi-plus p-1"
                style={{ fontSize: "25px", cursor: "pointer" }}
                onClick={() => {
                  handleQuantity(+1);
                }}
              />
            </div>
          </div>
          <div className="d-flex">
            <button
              className="btn btn-success me-2 flex-fill"
              onClick={() => handleAddToCart(menuItem)}
              disabled={isAddingToCart}
            >
              {isAddingToCart ? "Adding..." : "Add to Cart"}
            </button>
            <button className="btn btn-secondary flex-fill">
              Back to Home
            </button>
          </div>
        </div>
        <div className="col-md-5 d-flex justify-content-center align-items-center">
          <img
            src={menuItem.image}
            style={{ borderRadius: "50%", maxWidth: "100%" }}
            alt="No content"
          />
        </div>
      </div>
    </div>
  );
}

export default MenuItemDetails;
