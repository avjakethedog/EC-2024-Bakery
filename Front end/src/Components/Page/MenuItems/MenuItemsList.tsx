import React from "react";
import { useState, useEffect } from "react";
import { menuItemModel } from "../../../Interfaces";
import MenuItemCard from "./MenuItemCard";
import { setMenuItem } from "../../../Storage/Redux/menuItemSlice";
import { useDispatch, useSelector } from "react-redux";
import { useGetMenuItemsQuery } from "../../../Apis/menuItemApi";
import { RootState } from "../../../Storage/Redux/store";

function MenuItemsList() {
  const dispatch = useDispatch();
  const { data, isLoading } = useGetMenuItemsQuery(null);
  const menuItems = useSelector(
    (state: RootState) => state.menuItemStore.menuItem
  );
  useEffect(() => {
    if (!isLoading) {
      dispatch(setMenuItem(data.data));
    }
  }, [isLoading]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  console.log("MenuItemsList data:", data); // Check if data is fetched correctly
  console.log("MenuItemsList menuItems:", menuItems);

  return (
    <div className="container row">
      {menuItems &&
        menuItems.length > 0 &&
        menuItems.map((menuItem: menuItemModel) => (
          <MenuItemCard menuItem={menuItem} key={menuItem._id}></MenuItemCard>
        ))}
    </div>
  );
}

export default MenuItemsList;
