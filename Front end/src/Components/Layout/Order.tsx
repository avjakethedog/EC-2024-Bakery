import React, { forwardRef } from 'react';

type OrderProps = {
  order: {
    id: number;
    name: string;
    phone: string;
    total: string;
    items: number;
    date: string;
    status: 'Confirmed' | 'Completed' | 'Canceled' | 'Ready for pickup' | 'Being cooked' | 'Frozen storage' | 'Delivered';
  };
  onClick: () => void;  // Accept the onClick prop
};

const statusColors: Record<OrderProps['order']['status'], string> = {
  "Confirmed": 'bg-green-200 text-green-800',
  "Completed": 'bg-blue-200 text-blue-800',
  "Canceled": 'bg-red-200 text-red-800',
  "Ready for pickup": 'bg-yellow-200 text-yellow-800',
  "Being cooked": 'bg-yellow-200 text-yellow-800',
  "Frozen storage": 'bg-purple-200 text-purple-800',
  "Delivered": 'bg-teal-200 text-teal-800'  // Thêm màu cho trạng thái Delivered
};


const Order = forwardRef<HTMLTableRowElement, OrderProps>(({ order, onClick }, ref) => {
  return (
    <tr ref={ref} className="border-b border-gray-200 cursor-pointer hover:bg-gray-100" onClick={onClick}>
      <td className="py-2 px-6 text-center">{order.id}</td>
      <td className="py-2 px-6">{order.name}</td>
      <td className="py-2 px-6 text-center">{order.phone}</td>
      <td className="py-2 px-6 text-center">{order.items}</td>
      <td className="py-2 px-6 text-center">{order.date}</td>
      <td className="py-2 px-6 text-center">
        <span className={`px-2 py-1 rounded ${statusColors[order.status]}`}>
          {order.status}
        </span>
      </td>
      <td className="py-2 px-6 text-center">{order.total}</td>
    </tr>
  );
});

Order.displayName = 'Order';

export default Order;
