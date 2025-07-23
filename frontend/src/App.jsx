import { useState } from 'react'

import './App.css'
import AdminRoutes from './routes/AdminRoutes'
import UserRoutes from './routes/UserRoutes'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <AdminRoutes />
      <UserRoutes/>
    </>
  )
}

export default App
