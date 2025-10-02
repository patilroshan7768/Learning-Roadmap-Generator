import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import AuthContext from '../context/AuthContext.jsx';

const AdminRoute = () => {
  const { user } = useContext(AuthContext);

  if (user === undefined) {
    return <div>Loading...</div>; // Or a spinner component
  }

  return user && user.isAdmin ? <Outlet /> : <Navigate to="/login" replace />;
};

export default AdminRoute;