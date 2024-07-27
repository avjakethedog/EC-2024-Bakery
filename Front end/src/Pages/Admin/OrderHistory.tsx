import React, { useState } from 'react';
import Order from '../../Components/Layout/Order';

type OrderType = {
  id: number;
  name: string;
  phone: string;
  total: string;
  items: number;
  date: string;
  status: 'Confirmed' | 'Completed' | 'Canceled' | 'Ready for pickup' | 'Being cooked' | 'Frozen storage' | 'Delivered';
  previousStatus?: OrderType['status'];
};

const initialOrders: OrderType[] = [
  {
    id: 1,
    name: 'John Doe',
    phone: '123-456-7890',
    total: '$100',
    items: 5,
    date: '2024-07-25',
    status: 'Completed',
  },
  {
    id: 2,
    name: 'Jane Doe',
    phone: '098-765-4321',
    total: '$150',
    items: 3,
    date: '2024-07-26',
    status: 'Canceled',
  }
  // ... other orders
];

const OrderHistory: React.FC = () => {
  const [orders, setOrders] = useState<OrderType[]>(initialOrders);
  const [expandedOrderId, setExpandedOrderId] = useState<number | null>(null);

  const handleOrderClick = (orderId: number) => {
    setExpandedOrderId(prevId => (prevId === orderId ? null : orderId));
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">ORDER HISTORY</h1>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-6 border-b">ID</th>
            <th className="py-2 px-6 border-b">Name</th>
            <th className="py-2 px-6 border-b">Phone</th>
            <th className="py-2 px-6 border-b">Items</th>
            <th className="py-2 px-6 border-b">Date</th>
            <th className="py-2 px-6 border-b">Status</th>
            <th className="py-2 px-6 border-b">Total</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <React.Fragment key={order.id}>
              <Order order={order} onClick={() => handleOrderClick(order.id)} />
              {expandedOrderId === order.id && (
                <tr>
                  <td colSpan={7} className="p-4 bg-gray-100 border-t border-gray-200">
                    <div>
                      <h2 className="text-xl font-bold">Order Details</h2>
                      <p><strong>ID:</strong> {order.id}</p>
                      <p><strong>Name:</strong> {order.name}</p>
                      <p><strong>Phone:</strong> {order.phone}</p>
                      <p><strong>Items:</strong> {order.items}</p>
                      <p><strong>Date:</strong> {order.date}</p>
                      <p><strong>Status:</strong> {order.status}</p>
                      <p><strong>Total:</strong> {order.total}</p>
                      {/* No status change buttons here */}
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

export default OrderHistory;
