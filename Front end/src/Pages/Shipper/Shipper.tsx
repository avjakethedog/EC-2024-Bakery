import React, { useState, useEffect } from 'react';

type OrderType = {
  _id: number;
  UserId: number;   // ID của người dùng
  OrderDate: string;  // Ngày đặt hàng (Format: YYYY-MM-DDTHH:MM:SSZ)
  TotalAmount: number;  // Tổng số tiền (Format: ví dụ: 95000)
  OrderStatus: 'Pending' | 'Cooking' | 'Ready for pickup' | 'Delivering' | 'Completed' | 'Canceled'; // Trạng thái đơn hàng
  ShippingMethod?: string; // Phương thức giao hàng (có thể không có)
  PaymentMethod?: string; // Phương thức thanh toán (có thể không có)
  PaymentStatus?: string; // Trạng thái thanh toán (có thể không có)
  SpecialInstructions?: string; // Hướng dẫn đặc biệt (có thể không có)
  TrackingNumber?: string; // Số tracking (có thể không có)
  ShippingAddress?: string; // Địa chỉ giao hàng (có thể không có)
};

const UpdateOrder: React.FC = () => {
  const [orders, setOrders] = useState<OrderType[]>([]);
  const [expandedOrderId, setExpandedOrderId] = useState<number | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/order/getOrderByStatus/Cooking');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const D = await response.json();
        const data: OrderType[]=D.data;
        setOrders(data);
        console.log(data)
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    };

    // Fetch orders initially
    fetchOrders();

    // Set up polling every 10 seconds
    const intervalId = setInterval(() => {
      fetchOrders();
    }, 10000); // 10 seconds interval

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  const updateOrderStatus = async (orderId: number, newStatus: OrderType['OrderStatus']) => {
    try {
      const response = await fetch(`http://localhost:3000/api/order/update/${orderId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderStatus: newStatus,
        }),
      });

      if (response.ok) {
        // Remove the order from the list if status is not 'Cooking'
        setOrders(prevOrders =>
          prevOrders.filter(order => order._id !== orderId || newStatus === 'Cooking')
        );
      } else {
        console.error('Failed to update order status', await response.text());
      }
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  };

  const handleMarkAsCompleted = (order: OrderType) => {
    updateOrderStatus(order._id, 'Completed');
  };

  const handleCancelOrder = (order: OrderType) => {
    updateOrderStatus(order._id, 'Canceled');
  };

  return (
    <div className="container my-4">
      <h1 className="text-center mb-4">Orders Currently Delivering</h1>
      <table className="table table-striped table-bordered">
        <thead>
          <tr className="text-center">
            <th scope="col">Date</th>
            <th scope="col">Total</th>
            <th scope="col">Status</th>
            <th scope="col">Shipping Method</th>
            <th scope="col">Payment Method</th>
            <th scope="col">Tracking Number</th>
            <th scope="col">Payment Status</th>
            <th scope="col">Note</th>
            <th scope="col">Address</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <React.Fragment key={order._id}>
              <tr>
                <td>{new Date(order.OrderDate).toLocaleString()}</td>
                <td>{order.TotalAmount}</td>
                <td>{order.OrderStatus}</td>
                <td>{order.ShippingMethod || 'N/A'}</td>
                <td>{order.PaymentMethod || 'N/A'}</td>
                <td>{order.TrackingNumber || 'N/A'}</td>
                <td>{order.PaymentStatus || 'N/A'}</td>
                <td>{order.SpecialInstructions || 'N/A'}</td>
                <td>{order.ShippingAddress || 'N/A'}</td>
                <td>
                  <button
                    className="btn btn-primary me-2"
                    onClick={() => handleMarkAsCompleted(order)}
                  >
                    Mark as Completed
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleCancelOrder(order)}
                  >
                    Cancel Order
                  </button>
                </td>
              </tr>
              {expandedOrderId === order._id && (
                <tr>
                  <td colSpan={11} className="bg-light">
                    <div>
                      <h2 className="h4">Order Details</h2>
                      <p><strong>Date:</strong> {order.OrderDate}</p>
                      <p><strong>Total:</strong> {order.TotalAmount}</p>
                      <p><strong>Status:</strong> {order.OrderStatus}</p>
                      <p><strong>Shipping Method:</strong> {order.ShippingMethod || 'N/A'}</p>
                      <p><strong>Payment Method:</strong> {order.PaymentMethod || 'N/A'}</p>
                      <p><strong>Payment Status:</strong> {order.PaymentStatus || 'N/A'}</p>
                      <p><strong>Special Instructions:</strong> {order.SpecialInstructions || 'N/A'}</p>
                      <p><strong>Tracking Number:</strong> {order.TrackingNumber || 'N/A'}</p>
                      <p><strong>Shipping Address:</strong> {order.ShippingAddress || 'N/A'}</p>
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UpdateOrder;
