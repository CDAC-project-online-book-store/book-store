import React from 'react'
import { Routes, Route } from 'react-router-dom'
import AdminDashboard from '../pages/admin/AdminDashboard'
import ManageBooks from '../pages/admin/ManageBooks'
import ManageUsers from '../pages/admin/ManageUsers'
import ManageOrders from '../pages/admin/ManageOrders'
import Analytics from '../pages/admin/Analytics'
import EditBookForm from '../pages/admin/forms/EditBookForm'
import AddBookForm from '../pages/admin/forms/AddBookForm'
import BookDetails from '../pages/books/BookDetails';
import ProtectedRoute from './ProtectedRoute';

function AdminRoutes() {
  return (

    <Routes>
      <Route path="/admin/dashboard" element={
        <ProtectedRoute allowedRoles={['Admin']}>
          <AdminDashboard />
        </ProtectedRoute>
      } />
      <Route path="/admin/books" element={
        <ProtectedRoute allowedRoles={['Admin']}>
          <ManageBooks />
        </ProtectedRoute>
      } />
      <Route path="/admin/users" element={
        <ProtectedRoute allowedRoles={['Admin']}>
          <ManageUsers />
        </ProtectedRoute>
      } />
      <Route path="/admin/orders" element={
        <ProtectedRoute allowedRoles={['Admin']}>
          <ManageOrders />
        </ProtectedRoute>
      } />
      <Route path="/admin/analytics" element={
        <ProtectedRoute allowedRoles={['Admin']}>
          <Analytics />
        </ProtectedRoute>
      } />
      <Route path="/admin/books/edit/:id" element={
        <ProtectedRoute allowedRoles={['Admin']}>
          <EditBookForm />
        </ProtectedRoute>
      } />
      <Route path="/admin/books/details/:id" element={
        <ProtectedRoute allowedRoles={['Admin']}>
          <BookDetails />
        </ProtectedRoute>
      } />
      <Route path="/admin/books/add" element={
        <ProtectedRoute allowedRoles={['Admin']}>
          <AddBookForm />
        </ProtectedRoute>
      } />


    </Routes>

  )
}

export default AdminRoutes
