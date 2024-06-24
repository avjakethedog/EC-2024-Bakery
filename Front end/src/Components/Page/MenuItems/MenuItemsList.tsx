import React from "react";
import { useState, useEffect } from "react";
import { menuItemModel } from "../../../Interfaces";
import MenuItemCard from "./MenuItemCard";

function MenuItemsList() {
  const [menuItems, setMenuItems] = useState<menuItemModel[]>([
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
  ]);

  useEffect(() => {
    console.log("Menu items have been updated:", menuItems);
  }, [menuItems]);

  return (
    <div className="container row">
      {menuItems.length > 0 &&
        menuItems.map((menuItem, index) => (
          <MenuItemCard menuItem={menuItem} key={index}></MenuItemCard>
        ))}
    </div>
  );
}

export default MenuItemsList;
