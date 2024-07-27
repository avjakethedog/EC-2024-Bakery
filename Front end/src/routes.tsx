import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Cart from './Pages/Cart';
import Header from './Components/Layout/Header';
import Footer from './Components/Layout/Footer';
import Login from './Pages/LogIn';
import SignUp from './Pages/SignUp';
import AdminHeader from './Components/Layout/Admin/Header';
import AdminOrderList from './Pages/Admin/OrderList';
import ProductionCost from './Pages/Admin/ProductionCost';
import Revenue from './Pages/Admin/Revenue';
import OrderHistory from './Pages/Admin/OrderHistory';
// import HomePage from './pages/HomePage';  // Ensure correct paths
// import AboutPage from './pages/AboutPage';  // Ensure correct paths
// import ContactPage from './pages/ContactPage';  // Ensure correct paths
// import NotFoundPage from './pages/NotFoundPage';  // Ensure correct paths

const AppRoutes: React.FC = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';
  const isSignUpPage = location.pathname === '/signup';
  const isAdminPage = location.pathname.startsWith('/admin');

  return (
    <>
      {isAdminPage ? <AdminHeader /> : !isLoginPage && !isSignUpPage && <Header />}
      <Routes>
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/admin/orderlist" element={<AdminOrderList />} />
        <Route path="/admin/productioncost" element={<ProductionCost />} />
        <Route path="/admin/revenue" element={<Revenue />} />
        <Route path="/admin/orderhistory" element={<OrderHistory />} />
        {/* Other routes */}
      </Routes>
      {!isLoginPage && !isSignUpPage && !isAdminPage && <Footer />}
    </>
  );
};

export default AppRoutes;
