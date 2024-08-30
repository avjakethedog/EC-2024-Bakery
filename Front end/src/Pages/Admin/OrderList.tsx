import React, { useState, useEffect } from 'react';
import Order from '../../Components/Layout/Order'; // Đảm bảo đường dẫn là chính xác

type OrderType = {
  id: number;
  OrderId: number;  // ID của đơn hàng
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
  PreviousStatus?: OrderType['OrderStatus']; // Trạng thái trước đó (có thể không có)
};

const statusOrder: OrderType['OrderStatus'][] = [
  'Pending',
  'Cooking',
  'Ready for pickup',
  'Delivering',
  'Completed',
  'Canceled'
];

const getNextStatus = (status: OrderType['OrderStatus']): OrderType['OrderStatus'] | null => {
  const currentIndex = statusOrder.indexOf(status);

  return currentIndex !== -1 && currentIndex < statusOrder.length - 1
    ? statusOrder[currentIndex + 1]
    : null;
};

const getPreviousStatus = (status: OrderType['OrderStatus']): OrderType['OrderStatus'] | null => {
  const currentIndex = statusOrder.indexOf(status);

  return currentIndex > 0
    ? statusOrder[currentIndex - 1]
    : null;
};

const OrderList: React.FC = () => {
  const [orders, setOrders] = useState<OrderType[]>([]);
  const [expandedOrderId, setExpandedOrderId] = useState<number | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('http://localhost:3000/orders');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data: OrderType[] = await response.json();
        setOrders(data);
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    };

    fetchOrders();
  }, []);

  const handleOrderClick = (orderId: number) => {
    setExpandedOrderId(prevId => (prevId === orderId ? null : orderId));
  };

  const updateOrderStatus = async (orderId: number, newStatus: OrderType['OrderStatus']) => {
    try {
      const response = await fetch(`http://localhost:3000/orders/${orderId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          OrderStatus: newStatus,
        }),
      });

      if (response.ok) {
        const updatedOrder = await response.json();
        setOrders(prevOrders =>
          prevOrders.map(o =>
            o.OrderId === orderId ? { ...o, OrderStatus: updatedOrder.OrderStatus } : o
          )
        );
      } else {
        console.error('Failed to update order status', await response.text());
      }
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  };

  const handleNextStatus = (order: OrderType) => {
    const nextStatus = getNextStatus(order.OrderStatus);
    if (nextStatus) {
      updateOrderStatus(order.id, nextStatus);
    }
  };

  const handlePreviousStatus = (order: OrderType) => {
    const previousStatus = getPreviousStatus(order.OrderStatus);
    if (previousStatus) {
      updateOrderStatus(order.id, previousStatus);
    }
  };

  const handleCancelOrder = (order: OrderType) => {
    updateOrderStatus(order.id, 'Canceled');
  };

  return (
    <div className="container my-4">
      <h1 className="text-center mb-4">ORDER LIST</h1>
      <table className="table table-striped table-bordered">
        <thead>
          <tr className="text-center">
            <th scope="col">ID</th>
            <th scope="col">Date</th>
            <th scope="col">Total</th>
            <th scope="col">Status</th>
            <th scope="col">Shipping Method</th>
            <th scope="col">Payment Method</th>
            <th scope="col">Tracking Number</th>
            <th scope="col">Payment Status</th>
            <th scope="col">Note</th>
            <th scope="col">Address</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <React.Fragment key={order.OrderId}>
              <Order order={order} onClick={() => handleOrderClick(order.OrderId)} />
              {expandedOrderId === order.OrderId && (
                <tr>
                  <td colSpan={11} className="bg-light">
                    <div>
                      <h2 className="h4">Order Details</h2>
                      <p><strong>ID:</strong> {order.OrderId}</p>
                      <p><strong>Date:</strong> {order.OrderDate}</p>
                      <p><strong>Total:</strong> {order.TotalAmount}</p>
                      <p><strong>Status:</strong> {order.OrderStatus}</p>
                      <p><strong>Shipping Method:</strong> {order.ShippingMethod || 'N/A'}</p>
                      <p><strong>Payment Method:</strong> {order.PaymentMethod || 'N/A'}</p>
                      <p><strong>Payment Status:</strong> {order.PaymentStatus || 'N/A'}</p>
                      <p><strong>Special Instructions:</strong> {order.SpecialInstructions || 'N/A'}</p>
                      <p><strong>Tracking Number:</strong> {order.TrackingNumber || 'N/A'}</p>
                      <p><strong>Shipping Address:</strong> {order.ShippingAddress || 'N/A'}</p>
                      <div className="mt-3">
                        {/* Nút Previous Status */}
                        <button
                          className="btn btn-secondary me-2"
                          onClick={() => handlePreviousStatus(order)}
                          disabled={order.OrderStatus === 'Pending'}
                        >
                          Previous Status
                        </button>
                        {/* Nút Next Status */}
                        <button
                          className="btn btn-primary me-2"
                          onClick={() => handleNextStatus(order)}
                          disabled={order.OrderStatus === 'Completed' || order.OrderStatus === 'Canceled'}
                        >
                          Next Status
                        </button>
                        {/* Nút Cancel */}
                        <button
                          className="btn btn-danger"
                          onClick={() => handleCancelOrder(order)}
                          disabled={order.OrderStatus === 'Canceled'}
                        >
                          Cancel Order
                        </button>
                      </div>
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

export default OrderList;
