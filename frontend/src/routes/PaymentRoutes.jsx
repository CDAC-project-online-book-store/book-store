import { Routes, Route } from 'react-router-dom'
import Cart from '../pages/payment/Cart';
import Checkout from '../pages/payment/Checkout';


function PaymentRoutes() {
  return (
    <Routes>
      <Route path="/payment/cart" element={<Cart />} />
      <Route path="/payment/checkout" element={<Checkout />} />
    </Routes>
  )
}

export default PaymentRoutes
