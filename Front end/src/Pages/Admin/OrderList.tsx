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
    status: 'Confirmed',
  },
  {
    id: 2,
    name: 'Jane Doe',
    phone: '098-765-4321',
    total: '$150',
    items: 3,
    date: '2024-07-26',
    status: 'Frozen storage',
  }
  // ... other orders
];

const statusOrder: OrderType['status'][] = [
  'Confirmed',
  'Being cooked',
  'Completed',
  'Ready for pickup',
  'Frozen storage',
  'Delivered',
];


const getNextStatus = (status: OrderType['status']) => {
  const currentIndex = statusOrder.indexOf(status);
  if (status === 'Ready for pickup') {
    return 'Delivered'; // 'Ready for pickup' luôn chuyển tiếp đến 'Delivered'
  }
  return currentIndex !== -1 && currentIndex < statusOrder.length - 1 ? statusOrder[currentIndex + 1] : null;
};

const getPreviousStatus = (status: OrderType['status']) => {
  if (status === 'Frozen storage') {
    return 'Completed'; // 'Frozen storage' luôn quay lại 'Completed'
  }

  const currentIndex = statusOrder.indexOf(status);
  return currentIndex > 0 ? statusOrder[currentIndex - 1] : null;
};

const OrderList: React.FC = () => {
  const [orders, setOrders] = useState<OrderType[]>(initialOrders);
  const [expandedOrderId, setExpandedOrderId] = useState<number | null>(null);

  const handleOrderClick = (orderId: number) => {
    setExpandedOrderId(prevId => (prevId === orderId ? null : orderId));
  };

  const updateOrderStatus = (orderId: number, newStatus: OrderType['status'], previousStatus?: OrderType['status']) => {
    setOrders(prevOrders => prevOrders.map(order => {
      if (order.id === orderId) {
        // Cập nhật trạng thái của đơn hàng
        let updatedStatus = newStatus;
        let updatedPreviousStatus = previousStatus;
  
        // Đảm bảo trạng thái chuyển tiếp hợp lệ
        if (order.status === 'Completed' && (newStatus === 'Ready for pickup' || newStatus === 'Frozen storage')) {
          updatedPreviousStatus = 'Completed'; // Trạng thái trước khi 'Ready for pickup' hoặc 'Frozen storage' luôn là 'Completed'
        }
        
        if (order.status === 'Ready for pickup' && newStatus === 'Delivered') {
          updatedPreviousStatus = 'Ready for pickup'; // Trạng thái trước khi 'Delivered' luôn là 'Ready for pickup'
        }
  
        return { ...order, status: updatedStatus, previousStatus: updatedPreviousStatus };
      }
      return order;
    }));
    setExpandedOrderId(null);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">ORDER LIST</h1>
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
                      {order.status !== 'Completed' && (
                        <div className="mt-4">
                          {getPreviousStatus(order.status) && (
                            <button
                              className="px-4 py-2 bg-green-500 text-white rounded mr-2"
                              onClick={() => updateOrderStatus(order.id, getPreviousStatus(order.status)!)}>
                              Previous Status: {getPreviousStatus(order.status)}
                            </button>
                          )}
                          {getNextStatus(order.status) && (
                            <button
                              className="px-4 py-2 bg-blue-500 text-white rounded mr-2"
                              onClick={() => updateOrderStatus(order.id, getNextStatus(order.status)!)}>
                              Next Status: {getNextStatus(order.status)}
                            </button>
                          )}
                          <button
                            className="px-4 py-2 bg-red-500 text-white rounded"
                            onClick={() => updateOrderStatus(order.id, order.status === 'Canceled' && order.previousStatus ? order.previousStatus : 'Canceled', order.status === 'Canceled' && order.previousStatus ? undefined : order.status)}>
                            {order.status === 'Canceled' ? 'Undo Cancel' : 'Cancel'}
                          </button>
                        </div>
                      )}
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
