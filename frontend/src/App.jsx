import './App.css'
import AdminRoutes from './routes/AdminRoutes'
import UserRoutes from './routes/UserRoutes'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import BookRoutes from './routes/BookRoutes'
import PaymentRoutes from './routes/PaymentRoutes'
import DefaultRoutes from './routes/DefaultRoutes'

function App() {
  return (
    <>
      <DefaultRoutes/>
      <AdminRoutes />
      <UserRoutes />
      <BookRoutes />
      <PaymentRoutes/>

    </>
  )
}

export default App
