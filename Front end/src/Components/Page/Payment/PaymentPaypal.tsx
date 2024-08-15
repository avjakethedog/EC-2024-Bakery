import React from "react";
import { PayPalButton } from "react-paypal-button-v2";
import { toast } from "react-toastify";

// interface PaymentPaypalProps {
//   finalTotal: number;
// }

interface Product {
  name: string;
  price: number;
  quantity: number;
}

// interface PaymentPaypalProps {
//   finalTotal: number;
//   products: Product[];
//   shippingFee: number;
//   onSuccess: (details: any, data: any) => void;
// }

interface PaymentPaypalProps {
  onSuccess: (
    details: { payer: { name: { given_name: string } } },
    data: { orderID: any }
  ) => Promise<void>;
}

function PaymentPaypal({ onSuccess }: PaymentPaypalProps) {
  const finalTotal = Number(sessionStorage.getItem("finalTotal"));
  console.log("total: ", finalTotal);
  const amountInUSD = (finalTotal / 25050).toFixed(2);
  console.log("sau khi đổi qua đô: ", amountInUSD);

  const products: Product[] = JSON.parse(
    sessionStorage.getItem("products") || "[]"
  );
  const shippingFee = Number(sessionStorage.getItem("shippingFee"));

  if (!finalTotal || !products || !shippingFee) {
    toast.error("Error retrieving payment details. Please try again.");
    return null;
  }

  console.log("product: ", products);

  // const calculatedItemTotal = (
  //   products.reduce(
  //     (total, product) => total + product.price * product.quantity,
  //     0
  //   ) / 25050
  // ).toFixed(2);

  // console.log("Calculated item total: ", calculatedItemTotal);
  // const shippingTotal = (shippingFee / 25050).toFixed(2);
  // console.log("Shipping total: ", shippingTotal);

  // const amountToPay = (
  //   parseFloat(calculatedItemTotal) + parseFloat(shippingTotal)
  // ).toFixed(2);
  // console.log("Final amount to pay: ", amountToPay);

  // const items = products.map((product) => ({
  //   name: product.name,
  //   unit_amount: {
  //     currency_code: "USD",
  //     value: (product.price / 25050).toFixed(2),
  //   },
  //   quantity: product.quantity.toString(),
  // }));

  // console.log("ngu cho: ", items);
  const items = products.map((product) => {
    const unitPriceInUSD = parseFloat((product.price / 25050).toFixed(2)); // Làm tròn giá trị sản phẩm
    const totalPriceForProduct = parseFloat(
      (unitPriceInUSD * product.quantity).toFixed(2)
    ); // Tổng giá trị sau khi nhân với quantity và làm tròn

    return {
      name: product.name,
      unit_amount: {
        currency_code: "USD",
        value: unitPriceInUSD.toFixed(2), // Sử dụng giá trị đã làm tròn
      },
      quantity: product.quantity.toString(),
      total: totalPriceForProduct, // Thêm thuộc tính để lưu giá trị tổng
    };
  });

  console.log("item: ", items);

  const calculatedItemTotal = items
    .reduce((total, item) => total + item.total, 0)
    .toFixed(2); // Tổng giá trị sản phẩm đã làm tròn

  const shippingTotal = parseFloat((shippingFee / 25050).toFixed(2)); // Làm tròn phí vận chuyển

  const amountToPay = (parseFloat(calculatedItemTotal) + shippingTotal).toFixed(
    2
  ); // Tổng tiền cuối cùng sau khi cộng sản phẩm và ship

  console.log("Calculated item total: ", calculatedItemTotal);
  console.log("Shipping total: ", shippingTotal);
  console.log("Final amount to pay: ", amountToPay);

  const handlePaymentSuccess = async (details: any, data: any) => {
    try {
      // Gọi hàm onSuccess với thông tin giao dịch và orderID
      await onSuccess(details, data);
    } catch (error) {
      console.error("Error handling payment success: ", error);
      toast.error("Failed to process payment. Please try again.");
    }
  };

  return (
    <PayPalButton
      options={{
        clientId:
          "Adwet70povY5DGfENLTyrnVlUpgO8dnLHoiCuSaNzIVdlAI5wcYmJLO7mHoOWvpCh4Vud8xmBCjVzcUq",
        currency: "USD",
      }}
      amount={amountToPay}
      createOrder={(
        data: any,
        actions: {
          order: {
            create: (arg0: {
              purchase_units: {
                amount: {
                  currency_code: string;
                  value: any;
                  breakdown: {
                    item_total: { currency_code: string; value: string };
                    shipping: { currency_code: string; value: string };
                  };
                };
                items: {
                  name: string;
                  unit_amount: { currency_code: string; value: string };
                  quantity: string;
                }[];
              }[];
            }) => any;
          };
        }
      ) => {
        return actions.order.create({
          purchase_units: [
            {
              amount: {
                currency_code: "USD",
                value: amountToPay,
                breakdown: {
                  item_total: {
                    currency_code: "USD",
                    value: calculatedItemTotal,
                    // (
                    //   products.reduce(
                    //     (total, product) =>
                    //       total + product.price * product.quantity,
                    //     0
                    //   ) / 25050
                    // ).toFixed(2),
                  },
                  shipping: {
                    currency_code: "USD",
                    value: shippingTotal.toFixed(2),
                  },
                },
              },
              items,
            },
          ],
        });
      }}
      onSuccess={async (
        details: { payer: { name: { given_name: string } } },
        data: { orderID: any }
      ) => {
        console.log("Transaction completed by ", details.payer.name.given_name);
        console.log("Transaction details: ", details);
        console.log("Order ID: ", data.orderID);
        alert("Transaction completed by " + details.payer.name.given_name);

        //OPTIONAL: Call your server to save the transaction

        // return fetch("/paypal-transaction-complete", {
        //   method: "post",
        //   body: JSON.stringify({
        //     orderID: data.orderID,
        //   }),
        // });
        // Gọi hàm onSuccess với thông tin giao dịch và orderID
        await onSuccess(details, data);
      }}
    />
  );
}

export default PaymentPaypal;
