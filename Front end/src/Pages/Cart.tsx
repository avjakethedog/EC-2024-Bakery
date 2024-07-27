import React from 'react';
import { MenuItemCard } from '../Components/Page/MenuItems';
const Cart: React.FC = () => {
  return (
    <main className="py-8 px-4 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Your Shopping Cart</h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        <p className="text-lg font-medium mb-4">You currently have no items in your cart.</p>
        <p className="text-sm text-gray-600">Browse our products and add some to your cart!</p>
        <div className="mt-6">
          <a href="/" className="text-blue-500 hover:underline">Go back to shopping</a>
        </div>
      </div>
    </main>
  );
};

export default Cart;
