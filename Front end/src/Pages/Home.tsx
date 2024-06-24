import React from "react";
import { MenuItemCard, MenuItemsList } from "../Components/Page/MenuItems";

function Home() {
  return (
    <div>
      <div className="container p-2">
        <MenuItemsList />
      </div>
    </div>
  );
}

export default Home;
