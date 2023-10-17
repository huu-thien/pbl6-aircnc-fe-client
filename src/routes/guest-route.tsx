import { Navigate, Outlet } from 'react-router-dom';

const GuestRoute = () => {
  const user = false;
  if (user) {
    return <Navigate to='/' />;
  }
  return <Outlet />;
};

export default GuestRoute;
