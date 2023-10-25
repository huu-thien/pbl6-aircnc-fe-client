import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
// import { toast } from 'react-toastify';

const GuestRoute = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  if (user) {
    // toast.error('Bạn đã ở trong phiên đăng nhập');
    return <Navigate to='/' />;
  }
  return <Outlet />;
};

export default GuestRoute;
