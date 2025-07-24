import React from 'react'
import Reviews from '../pages/user/AddReview'
import AddNewAddress from '../pages/user/AddNewAddress'
import Address from '../pages/user/Address'
import EditAddress from '../pages/user/EditAddress'
import Settings from '../pages/user/Settings'
import { Routes, Route } from 'react-router-dom'
import ContactUs from '../pages/user/ContactUs'

function UserRoutes() {
  return (
   <Routes>
      <Route path='/add-review' element={<Reviews />} />
      <Route path='/add-new-address' element={<AddNewAddress />} />
      <Route path='/addresses' element={<Address />} />
      <Route path='/edit-address' element={<EditAddress />} />
      <Route path='/settings' element={<Settings />} />
      <Route path='/contact-us' element={<ContactUs />} />
    </Routes>
  )
}

export default UserRoutes
