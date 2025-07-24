import { useState } from 'react'

// import './App.css'
import AdminRoutes from './routes/AdminRoutes'
import UserRoutes from './routes/UserRoutes'
import BookRoutes from './routes/BookRoutes'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <AdminRoutes />
      <UserRoutes />
      <BookRoutes />
    </>
  )
}

export default App
