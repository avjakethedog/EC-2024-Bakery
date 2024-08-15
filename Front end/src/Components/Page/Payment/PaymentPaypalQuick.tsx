import React from "react";
import { PayPalButton } from "react-paypal-button-v2";

interface Product {
  name: string;
  price: number;
  quantity: number;
}

interface PaymentPaypalProps {
  finalTotal: number;
  products: Product[];
  shippingFee: number;
  onSuccess: (
    details: { payer: { name: { given_name: string } } },
    data: { orderID: any }
  ) => Promise<void>;
}

function PaymentPaypalQuick({
  finalTotal,
  products,
  shippingFee,
  onSuccess,
}: PaymentPaypalProps) {
  // const amountInUSD = (finalTotal / 23000).toFixed(2);

  // const items = products.map((product) => ({
  //   name: product.name,
  //   unit_amount: {
  //     currency_code: "USD",
  //     value: (product.price / 23000).toFixed(2),
  //   },
  //   quantity: product.quantity.toString(),
  // }));

  const items = products.map((product) => {
    const unitPriceInUSD = parseFloat((product.price / 23000).toFixed(2));
    const totalPriceForProduct = (unitPriceInUSD * product.quantity).toFixed(2);

    return {
      name: product.name,
      unit_amount: {
        currency_code: "USD",
        value: unitPriceInUSD.toFixed(2), // Sử dụng giá trị đã làm tròn
      },
      quantity: product.quantity.toString(),
      total: totalPriceForProduct, // Lưu tổng giá trị cho từng sản phẩm
    };
  });

  // Tổng giá trị tất cả sản phẩm
  const calculatedItemTotal = items
    .reduce((total, item) => total + parseFloat(item.total), 0)
    .toFixed(2);

  // Làm tròn giá trị phí vận chuyển
  const shippingTotal = parseFloat((shippingFee / 23000).toFixed(2));

  // Tổng tiền cuối cùng bao gồm phí vận chuyển
  const amountToPay = (parseFloat(calculatedItemTotal) + shippingTotal).toFixed(
    2
  );

  console.log("Calculated item total: ", calculatedItemTotal);
  console.log("Shipping total: ", shippingTotal);
  console.log("Final amount to pay: ", amountToPay);

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
                    //  (
                    //   products.reduce(
                    //     (total, product) =>
                    //       total + product.price * product.quantity,
                    //     0
                    //   ) / 23000
                    // ).toFixed(2),
                  },
                  shipping: {
                    currency_code: "USD",
                    value: shippingTotal.toFixed(2),
                    //(shippingFee / 23000).toFixed(2),
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

        // OPTIONAL: Call your server to save the transaction
        // return fetch("/paypal-transaction-complete", {
        //   method: "post",
        //   body: JSON.stringify({
        //     orderID: data.orderID,
        //   }),
        // });
        await onSuccess(details, data);
      }}
    />
  );
}

export default PaymentPaypalQuick;
