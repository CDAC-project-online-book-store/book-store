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

function UserRoutes() {
  return (
    
    <Routes>
      <Route path='/user/add-review' element={<Reviews />} />
      <Route path='/user/add-new-address' element={<AddNewAddress />} />
      <Route path='/user/addresses' element={<AddressList />} />
      <Route path='/user/address' element={<AddOrEditAddress />} />
      <Route path='/user/address/:index' element={<AddOrEditAddress />} />
      <Route path='/user/edit-address' element={<EditAddress />} />
      <Route path='/user/settings' element={<Settings />} />
      <Route path='/user/contact-us' element={<ContactUs />} />  
      <Route path='/user/profile' element={<Profile />} />  
      <Route path='/user/order-history' element={<OrderHistory />} />  
      <Route path='/user/add-review' element={<Reviews />} />

    </Routes>
   
  )
}

export default UserRoutes
