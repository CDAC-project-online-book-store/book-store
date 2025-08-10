import { Routes, Route } from 'react-router-dom'
import Cart from '../pages/payment/Cart';
import Checkout from '../pages/payment/Checkout';
import ProtectedRoute from './ProtectedRoute';
import OrderPlaced from '../pages/payment/OrderPlaced';


function PaymentRoutes() {
  return (
    <Routes>
      <Route path="/payment/cart" element={<Cart />} />
      <Route path="/payment/checkout" element={<ProtectedRoute allowedRoles={["customer"]}><Checkout /></ProtectedRoute>} />
      <Route path="/payment/order-placed" element={<ProtectedRoute allowedRoles={["customer"]}><OrderPlaced /></ProtectedRoute>} />
    </Routes>
  )
}

export default PaymentRoutes