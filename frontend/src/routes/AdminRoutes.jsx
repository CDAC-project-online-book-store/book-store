import React from 'react'
import { Routes, Route } from 'react-router-dom'
import AdminDashboard from '../pages/admin/AdminDashboard'
import ManageBooks from '../pages/admin/ManageBooks'
import ManageUsers from '../pages/admin/ManageUsers'
import ManageOrders from '../pages/admin/ManageOrders'
import Analytics from '../pages/admin/Analytics'

function AdminRoutes() {
  return (
    <Routes>
        <Route path="/admin/dashboard" element={<AdminDashboard/>} />
        <Route path="/admin/books" element={<ManageBooks/>} />
        <Route path="/admin/users" element={<ManageUsers/>} />
        <Route path="/admin/orders" element={<ManageOrders/>} />
        <Route path="/admin/analytics" element={<Analytics/>} />
      </Routes>
  )
}

export default AdminRoutes
