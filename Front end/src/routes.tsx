import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './Components/Layout/Header';
import Footer from './Components/Layout/Footer';
// Shipper
import Shipper from './Pages/Shipper/Shipper';
// Kitchen
import KitchenHeader from './Components/Layout/Kitchen/KitchenHeader';
import UpdateOrder from './Pages/Kitchen/UpdateOrder';
import MaterialsManagement from './Pages/Kitchen/MaterialsManagament';

// Admin
import AdminHeader from './Components/Layout/Admin/Header';
import AdminOrderList from './Pages/Admin/OrderList';
import AdminOrdersInDay from './Pages/Admin/OrdersInDay';
import ProductionCost from './Pages/Admin/ProductionCost';
import Revenue from './Pages/Admin/Revenue';
import OrdersInDay from './Pages/Admin/OrdersInDay';

const AppRoutes: React.FC = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';
  const isSignUpPage = location.pathname === '/signup';
  const isAdminPage = location.pathname.startsWith('/admin');
  const isKitchenPage = location.pathname.startsWith('/kitchen');
  const isShipperPage = location.pathname.startsWith('/shipper');


  return (
    <>
      {isAdminPage ? <AdminHeader /> : isKitchenPage ? <KitchenHeader /> : !isShipperPage && !isLoginPage && !isSignUpPage && <Header /> }
      <Routes>
        <Route path="/admin/orderlist" element={<AdminOrderList />} />
        <Route path="/admin/ordersinday" element={<OrdersInDay />} />
        <Route path="/admin/productioncost" element={<ProductionCost />} />
        <Route path="/admin/revenue" element={<Revenue />} />
        <Route path="/kitchen/updateorder" element={<UpdateOrder />} />
        <Route path="/kitchen/materialsmanagement" element={<MaterialsManagement />} />
        <Route path="/shipper" element={<Shipper />} />
        {/* Other routes */}
      </Routes>
      {!isLoginPage && !isSignUpPage && !isAdminPage && !isKitchenPage && !isShipperPage && <Footer />}
    </>
  );
};

export default AppRoutes;
