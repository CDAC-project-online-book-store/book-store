import './App.css'
import AdminRoutes from './routes/AdminRoutes'
import UserRoutes from './routes/UserRoutes'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import BookRoutes from './routes/BookRoutes'
import PaymentRoutes from './routes/PaymentRoutes'
import DefaultRoutes from './routes/DefaultRoutes'
import AdminBar from './components/navbar/AdminBar'
import DefaultNavbar from './components/navbar/DefaultNavbar'
import UserNavbar from './components/navbar/UserNavbar'


function App() {
  const user = JSON.parse(localStorage.getItem('user'));

  const role = user?.role?.toLowerCase();

  const renderNavbar = () => {
    if (role === 'admin') return <AdminBar />;
    if (role === 'customer') return <UserNavbar />;
    return <DefaultNavbar />;
  };

  return (
    <>
      {renderNavbar()}
      {(!role || role === 'guest') && <DefaultRoutes />}
      {role === 'admin' && <AdminRoutes />}
      {role === 'customer' && <UserRoutes />}
      <BookRoutes />
      <PaymentRoutes />
    </>
  );
}

export default App
