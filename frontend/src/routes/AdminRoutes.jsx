import React from 'react'
import { Routes, Route } from 'react-router-dom'
import AdminDashboard from '../pages/admin/AdminDashboard'
import ManageBooks from '../pages/admin/ManageBooks'
import ManageUsers from '../pages/admin/ManageUsers'
import ManageOrders from '../pages/admin/ManageOrders'
import Analytics from '../pages/admin/Analytics'
import EditBookForm from '../pages/admin/forms/EditBookForm'
import AddBookForm from '../pages/admin/forms/AddBookForm'
import AdminBookDetails from '../pages/admin/book/AdminBookDetails';
import AdminProfile from '../pages/admin/AdminProfile';
import AdminOrderDetails from '../pages/admin/orders/AdminOrderDetails';
import ProtectedRoute from './ProtectedRoute';

function AdminRoutes() {
  return (

    <Routes>
      {/* route to Admin Profile */}
      <Route path="/admin/profile" element={
        <ProtectedRoute allowedRoles={['admin']}>
          <AdminProfile />
        </ProtectedRoute>
      } />

      <Route path="/admin/dashboard" element={
        <ProtectedRoute allowedRoles={['admin']}>
          <AdminDashboard />
        </ProtectedRoute>
      } />
      <Route path="/admin/books" element={
        <ProtectedRoute allowedRoles={['admin']}>
          <ManageBooks />
        </ProtectedRoute>
      } />
      <Route path="/admin/users" element={
        <ProtectedRoute allowedRoles={['admin']}>
          <ManageUsers />
        </ProtectedRoute>
      } />
      <Route path="/admin/orders" element={
        <ProtectedRoute allowedRoles={['admin']}>
          <ManageOrders />
        </ProtectedRoute>
      } />
      <Route path="/admin/analytics" element={
        <ProtectedRoute allowedRoles={['admin']}>
          <Analytics />
        </ProtectedRoute>
      } />
      <Route path="/admin/books/edit/:id" element={
        <ProtectedRoute allowedRoles={['admin']}>
          <EditBookForm />
        </ProtectedRoute>
      } />
      <Route path="/admin/books/details/:id" element={
        <ProtectedRoute allowedRoles={['admin']}>
          <AdminBookDetails />
        </ProtectedRoute>
      } />
      <Route path="/admin/books/add" element={
        <ProtectedRoute allowedRoles={['admin']}>
          <AddBookForm />
        </ProtectedRoute>
      } />

      <Route path='/admin/orders/:id' element={
        <ProtectedRoute allowedRoles={['admin']}>
          <AdminOrderDetails />
        </ProtectedRoute>
      } />

    </Routes>

  )
}

export default AdminRoutes
