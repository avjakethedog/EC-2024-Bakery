import React from "react";
import { Header, Footer } from "../Components/Layout";
import {
  Home,
  MenuItemDetails,
  NotFound,
  ShoppingCart,
  Login,
  Register,
  AuthenticationTest,
  AuthenticationTestAdmin,
  AccessDenied,
} from "../Pages";
import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useGetShoppingCartQuery } from "../Apis/shoppingCartApi";
import { setShoppingCart } from "../Storage/Redux/shoppingCartSlice";
import { setLoggedInUser } from "../Storage/Redux/userNameSlice";
import { json } from "stream/consumers";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Load user from local storage if exists
    // const userData = localStorage.getItem("userId");
    const userData = sessionStorage.getItem("userId");
    console.log("userData: ", userData);
    if (userData) {
      dispatch(setLoggedInUser(JSON.parse(userData)));
    }
  }, [dispatch]);

  // useEffect(() => {
  //   // Load user from local storage if exists
  //   const userOrder = localStorage.getItem("orderId");
  //   console.log("userData: ", userOrder);
  //   if (userOrder) {
  //     dispatch(setShoppingCart(JSON.parse(userOrder)));
  //   }
  // }, [dispatch]);

  //demo 1
  //const orderId = localStorage.getItem("orderId");

  const orderId = sessionStorage.getItem("orderId");
  console.log("order: ", orderId);
  const { data, isLoading, error } = useGetShoppingCartQuery(
    //"66a466c8df540ff0e4564994"
    orderId
  );

  console.log("toi la gay", data);
  useEffect(() => {
    if (!isLoading && !error) {
      console.log("Fetched cart data:", data?.data);
      dispatch(setShoppingCart(data?.data));
    }
  }, [data, isLoading, error, dispatch]);

  return (
    <div className="text-success">
      <Header />
      <div className="pb-5">
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route
            path="/menuItemDetails/:id"
            element={<MenuItemDetails />}
          ></Route>
          <Route path="/shoppingCart" element={<ShoppingCart />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route
            path="/authentication"
            element={<AuthenticationTest />}
          ></Route>
          <Route
            path="/authorization"
            element={<AuthenticationTestAdmin />}
          ></Route>
          <Route path="/denied" element={<AccessDenied />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
