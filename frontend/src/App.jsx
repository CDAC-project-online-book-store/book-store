<<<<<<< HEAD
import { useState } from 'react'

// import './App.css'
=======
import './App.css'
>>>>>>> 0ab0c7df3a2a93072d8c57e96deb0004cc435253
import AdminRoutes from './routes/AdminRoutes'
import UserRoutes from './routes/UserRoutes'
import BookRoutes from './routes/BookRoutes'

function App() {
  return (
    <>
      <AdminRoutes />
      <UserRoutes />
      <BookRoutes />
    </>
  )
}

export default App
