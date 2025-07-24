import './App.css'
import AdminRoutes from './routes/AdminRoutes'
import UserRoutes from './routes/UserRoutes'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'

function App() {
  return (
    <>
      <AdminRoutes />
      <UserRoutes />
    </>
  )
}

export default App
