import './App.css'
import AdminRoutes from './routes/AdminRoutes'
import PaymentRoutes from './routes/PaymentRoutes'
import UserRoutes from './routes/UserRoutes'

function App() {
  return (
    <>
      <AdminRoutes />
      <UserRoutes />
      <PaymentRoutes />
    </>
  )
}

export default App
