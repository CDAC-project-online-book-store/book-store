import React from 'react'
import Reviews from '../pages/user/AddReview'
import AddNewAddress from '../pages/user/AddNewAddress'
import Address from '../pages/user/Address'
import EditAddress from '../pages/user/EditAddress'
import Settings from '../pages/user/Settings'
import { Routes, Route } from 'react-router-dom'
import ContactUs from '../pages/user/ContactUs'
import Profile from '../pages/user/Profile'
import OrderHistory from '../pages/user/OrderHistory'
import AddOrEditAddress from '../pages/user/AddOrEditAddress'
import AddressList from '../pages/user/AddressList'

import ProtectedRoute from './ProtectedRoute';
import UserDashboard from '../pages/user/UserDashboard';

function UserRoutes() {
  return (
    
    <Routes>
      <Route path='/user/dashboard' element={<ProtectedRoute allowedRoles={['Customer']}><UserDashboard /></ProtectedRoute>} />
      <Route path='/user/add-review' element={<ProtectedRoute allowedRoles={['Customer']}><Reviews /></ProtectedRoute>} />
      <Route path='/user/add-new-address' element={<ProtectedRoute allowedRoles={['Customer']}><AddNewAddress /></ProtectedRoute>} />
      <Route path='/user/addresses' element={<ProtectedRoute allowedRoles={['Customer']}><AddressList /></ProtectedRoute>} />
      <Route path='/user/address' element={<ProtectedRoute allowedRoles={['Customer']}><AddOrEditAddress /></ProtectedRoute>} />
      <Route path='/user/address/:index' element={<ProtectedRoute allowedRoles={['Customer']}><AddOrEditAddress /></ProtectedRoute>} />
      <Route path='/user/edit-address' element={<ProtectedRoute allowedRoles={['Customer']}><EditAddress /></ProtectedRoute>} />
      <Route path='/user/settings' element={<ProtectedRoute allowedRoles={['Customer']}><Settings /></ProtectedRoute>} />
      <Route path='/user/contact-us' element={<ProtectedRoute allowedRoles={['Customer']}><ContactUs /></ProtectedRoute>} />  
      <Route path='/user/profile' element={<ProtectedRoute allowedRoles={['Customer']}><Profile /></ProtectedRoute>} />  
      <Route path='/user/order-history' element={<ProtectedRoute allowedRoles={['Customer']}><OrderHistory /></ProtectedRoute>} />  
      <Route path='/user/add-review' element={<ProtectedRoute allowedRoles={['Customer']}><Reviews /></ProtectedRoute>} />
    </Routes>
   
  )
}

export default UserRoutes
