import React, { forwardRef } from 'react';

type OrderType = {
  OrderId: number;
  UserId: number;
  OrderDate: string;
  TotalAmount: number;
  OrderStatus: 'Pending' | 'Cooking' | 'Ready for pickup' | 'Delivering' | 'Completed' | 'Canceled';
  ShippingMethod?: string;
  PaymentMethod?: string;
  PaymentStatus?: string;
  SpecialInstructions?: string;
  TrackingNumber?: string;
  ShippingAddress?: string;
  PreviousStatus?: OrderType['OrderStatus'];
};

type OrderProps = {
  order: OrderType;
  onClick: () => void;
};

const statusColors: Record<
  'Pending' | 'Cooking' | 'Ready for pickup' | 'Delivering' | 'Completed' | 'Canceled',
  string
> = {
  "Pending": 'bg-secondary text-white',
  "Cooking": 'bg-warning text-dark',
  "Ready for pickup": 'bg-warning text-dark',
  "Delivering": 'bg-info text-white',
  "Completed": 'bg-success text-white',
  "Canceled": 'bg-danger text-white'
};

const Order = forwardRef<HTMLTableRowElement, OrderProps>(({ order, onClick }, ref) => {
  console.log("Rendering Order:", order);  // Debugging

  return (
    <tr ref={ref} className="cursor-pointer" onClick={onClick}>
      <td className="text-center">{order.OrderId}</td>
      <td className="text-center">{order.OrderDate}</td>
      <td className="text-center">{order.TotalAmount}</td>
      <td className="text-center">
        <span className={`badge ${statusColors[order.OrderStatus]}`}>
          {order.OrderStatus}
        </span>
      </td>
      <td className="text-center">{order.ShippingMethod || 'N/A'}</td>
      <td className="text-center">{order.PaymentMethod || 'N/A'}</td>
      <td className="text-center">{order.TrackingNumber || 'N/A'}</td>
      <td className="text-center">{order.PaymentStatus || 'N/A'}</td>
      <td className="text-center">{order.SpecialInstructions || 'N/A'}</td>
      <td className="text-center">{order.ShippingAddress || 'N/A'}</td>
    </tr>
  );
});

Order.displayName = 'Order';

export default Order;
