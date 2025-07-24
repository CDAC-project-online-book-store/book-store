
import { useState } from 'react'

// import './App.css'

import './App.css'

import AdminRoutes from './routes/AdminRoutes'
import PaymentRoutes from './routes/PaymentRoutes'
import UserRoutes from './routes/UserRoutes'
import BookRoutes from './routes/BookRoutes'

function App() {
  return (
    <>
      <AdminRoutes />
      <UserRoutes />
      <PaymentRoutes />
      <BookRoutes />
    </>
  )
}

export default App
