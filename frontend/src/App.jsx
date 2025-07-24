import './App.css'
import AdminRoutes from './routes/AdminRoutes'
import UserRoutes from './routes/UserRoutes'
import BookRoutes from './routes/BookRoutes'
import PaymentRoutes from './routes/PaymentRoutes'

function App() {
  return (
    <>
      <AdminRoutes />
      <UserRoutes />
      <BookRoutes />
      <PaymentRoutes/>
    </>
  )
}

export default App
