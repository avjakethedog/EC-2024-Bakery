import React from "react";
import { Header, Footer } from "../Components/Layout";
import { Home } from "../Pages";
import { MenuItemCard } from "../Components/Page/MenuItems";

function App() {
  return (
    <div className="text-success">
      <Header />
      <MenuItemCard />
      <MenuItemCard />
      <MenuItemCard />
      <MenuItemCard />
      <MenuItemCard />
      <MenuItemCard />
      <Footer />
    </div>
  );
}

export default App;
