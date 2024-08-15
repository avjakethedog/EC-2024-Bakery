import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { OrderSummary } from "../Components/Page/Order";
import PaymentPaypal from "../Components/Page/Payment/PaymentPaypal";

function Payment() {
  const navigate = useNavigate();
  // const location = useLocation();
  // const { customerDetails, selectedItems } = location.state;

  // Tính tổng giá trị đơn hàng
  // const grandTotal = selectedItems.reduce(
  //   (total: number, item: { priceone: number; quantity: number }) => {
  //     return total + item.priceone * item.quantity;
  //   },
  //   0
  // );

  // console.log("thông tin bên payment", customerDetails);
  // console.log("thông tin đơn hàng: ", selectedItems);

  const location = useLocation();
  const { customerDetails, selectedItems } = location.state;
  const [finalTotal, setFinalTotal] = useState(0); // State để lưu `finalTotal`

  const handleTotalCalculated = (total: number) => {
    setFinalTotal(total);
  };

  const handleApprove = (orderData: any) => {
    console.log("Order approved:", orderData);
    // Xử lý sau khi thanh toán thành công, ví dụ: cập nhật trạng thái đơn hàng
  };
  console.log("gaga: ", finalTotal);

  const [isUnsaved, setIsUnsaved] = useState(true); // State to track unsaved changes

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (isUnsaved) {
        event.preventDefault();
        event.returnValue = ""; // Cần thiết để hiển thị cảnh báo mặc định của trình duyệt.
      }
    };

    const handlePopState = (event: PopStateEvent) => {
      if (isUnsaved) {
        event.preventDefault();
        const confirmLeave = window.confirm(
          "Mọi thông tin chưa được lưu. Bạn có muốn tiếp tục?"
        );
        if (confirmLeave) {
          // Xóa session storage và điều hướng về trang chủ
          sessionStorage.removeItem("selectedItems");
          sessionStorage.removeItem("finalTotal");
          sessionStorage.removeItem("shippingFee");
          setIsUnsaved(false);
          navigate("/");
        }
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("popstate", handlePopState);
    };
  }, [isUnsaved]);

  return (
    <div>
      <OrderSummary />

      {/* <div className="col-md-5">
          <PaymentPaypal />
        </div> */}
    </div>
  );
}

export default Payment;
