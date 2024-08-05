import React, { useEffect, useState } from "react";
import { MiniLoader } from "../Common";
import { useDispatch, useSelector } from "react-redux";
import { useGetShoppingCartQuery } from "../../../Apis/shoppingCartApi";
import { setShoppingCart } from "../../../Storage/Redux/shoppingCartSlice";
import { cartItemModel } from "../../../Interfaces";
import { RootState } from "../../../Storage/Redux/store";

interface CartPickUpDetailsProps {
  selectedItems?: string[];
}

const CartPickUpDetails: React.FC<CartPickUpDetailsProps> = ({
  selectedItems = [],
}) => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    shippingAddress: "",
  });

  useEffect(() => {
    const userDataString = sessionStorage.getItem("userId");
    if (userDataString) {
      try {
        const parsedUserData = JSON.parse(userDataString);
        setUserData(parsedUserData);
      } catch (error) {
        console.error("Error parsing userData from sessionStorage:", error);
      }
    }
  }, []);

  const dispatch = useDispatch();

  // Lấy orderId từ sessionStorage
  const orderId = sessionStorage.getItem("orderId");

  // Gọi API để lấy dữ liệu giỏ hàng
  const { data, error } = useGetShoppingCartQuery(orderId);

  useEffect(() => {
    if (data && !isLoading && !error) {
      dispatch(setShoppingCart(data?.data)); // Cập nhật dữ liệu giỏ hàng vào store
    }
  }, [data, error, dispatch]);

  const shoppingCartFromStore: cartItemModel[] = useSelector(
    (state: RootState) => {
      const items = state.shoppingCartStore.cartItems;
      return Array.isArray(items) ? items : [];
    }
  );

  const [isLoading, setIsLoading] = useState(false);

  let grandTotal = 0;
  let totalItems = 0;

  shoppingCartFromStore.forEach((cartItem) => {
    if (selectedItems.includes(cartItem._id)) {
      totalItems += cartItem.quantity ?? 0;
      grandTotal += (cartItem.price ?? 0) * (cartItem.quantity ?? 0);
    }
  });

  return (
    <div className="border pb-5 pt-3">
      <h1 style={{ fontWeight: "300" }} className="text-center text-success">
        Pickup Details
      </h1>
      <hr />
      <form className="col-10 mx-auto">
        <div className="form-group mt-3">
          Pickup Name
          <input
            type="text"
            className="form-control"
            placeholder="name..."
            name="name"
            value={userData.name}
            required
          />
        </div>
        <div className="form-group mt-3">
          Pickup Email
          <input
            type="email"
            className="form-control"
            placeholder="email.."
            name="email"
            value={userData.email}
            required
          />
        </div>

        <div className="form-group mt-3">
          Địa chỉ
          <input
            type="text"
            className="form-control"
            placeholder="Address.."
            name="shippingAddress"
            value={userData.shippingAddress}
            required
          />
        </div>
        <div className="form-group mt-3">
          <div className="card p-3" style={{ background: "ghostwhite" }}>
            <h5>Grand Total : ${grandTotal.toFixed(2)}</h5>
            <h5>No of items : {totalItems}</h5>
          </div>
        </div>
        <button
          type="submit"
          className="btn btn-lg btn-success form-control mt-3"
          disabled={isLoading}
        >
          {isLoading ? <MiniLoader /> : "Looks Good? Place Order!"}
        </button>
      </form>
    </div>
  );
};

export default CartPickUpDetails;
