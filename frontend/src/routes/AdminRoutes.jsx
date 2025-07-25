import React from 'react'
import { Routes, Route } from 'react-router-dom'
import AdminDashboard from '../pages/admin/AdminDashboard'
import ManageBooks from '../pages/admin/ManageBooks'
import ManageUsers from '../pages/admin/ManageUsers'
import ManageOrders from '../pages/admin/ManageOrders'
import Analytics from '../pages/admin/Analytics'
import EditBookForm from '../pages/admin/forms/EditBookForm'
import AddBookForm from '../pages/admin/forms/AddBookForm'

function AdminRoutes() {
  return (

    <Routes>
        <Route path="/admin" element={<AdminDashboard/>} />
        <Route path="/admin/books" element={<ManageBooks/>} />
        <Route path="/admin/users" element={<ManageUsers/>} />
        <Route path="/admin/orders" element={<ManageOrders/>} />
        <Route path="/admin/analytics" element={<Analytics/>} />
        <Route path="/admin/books/edit/:isbn" element={<EditBookForm />} />
        <Route path="/admin/books/add" element={<AddBookForm />} />
      </Routes>
 
  )
}

export default AdminRoutes
