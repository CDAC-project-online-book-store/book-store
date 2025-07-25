import React from 'react'
import { Link } from 'react-router-dom'
import AdminNavbar from '../../components/AdminNavbar'

function AdminDashboard() {
  return (
    
   <div className='container mt-4'>
      <h2>Welcome, Admin</h2>
      <p className="lead">select a module to manage: </p>
        <div className="list-group">
            <Link to="/admin/books">Manage Book</Link>
            <Link to="/admin/users">Manage User</Link>
            <Link to="/admin/orders">Manage Order</Link>
            <Link to="/admin/analytics">Analytics</Link>    
        </div>
      </div>
  )
}

export default AdminDashboard
