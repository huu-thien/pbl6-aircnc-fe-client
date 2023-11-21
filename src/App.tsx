import { Routes, Route } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout/MainLayout';
import AuthenticationRoute from '@/routes/authenticate-route';
import Authenticate from '@/pages/Authenticate';
import PageNotFound from '@/pages/PageNotFound';
import GuestRoute from '@/routes/guest-route';

import { createTheme, ThemeProvider } from '@mui/material';
import Home from './pages/Home';
import Wishlist from './pages/Wishlist';
import DetailRoom from './pages/DetailRoom';
import HostInfo from './pages/HostInfo';
import BecomeHost from './pages/BecomeHost';
import { ToastContainer } from 'react-toastify';
// import { Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import { saveUserLogin } from './redux-toolkit/auth.slice';
import { UserType } from './@types/user';
import ListBookingGuest from './pages/ListBookingGuest';
import BookingConfirmed from './pages/BookingConfirmed';
import InfoAccount from './pages/InfoAccount';
import BookingChecked from './pages/BookingChecked';
import AdminLayout from './layouts/AdminLayout/AdminLayout';
import Dashboard from './pages/Admin/Dashboard/Dashboard';
import ManageAccount from './pages/Admin/ManageAcount/ManageAccount';
import ManageProperties from './pages/Admin/ManageProperties/ManageProperties';
import ManageCancellation from './pages/Admin/ManageCancellation/ManageCancellation';
import ManagePayment from './pages/Admin/ManagePayment/ManagePayment';

function App() {
  const theme = createTheme({
    typography: {
      fontFamily: 'Lexend',
    },
  });
  const dispatch = useDispatch();
  const userLocal = localStorage.getItem('user');
  const accessTokenLocal = localStorage.getItem('accessToken');
  const refreshTokenLocal = localStorage.getItem('refreshToken');
  const roleLocal = localStorage.getItem('role');

  let user: UserType | null = null;
  let accessToken: string | null = null;
  let refreshToken: string | null = null;
  let role: string | null = null;

  if (userLocal !== null && accessTokenLocal !== null && refreshTokenLocal !== null && roleLocal !== null) {
    user = JSON.parse(userLocal);
    accessToken = JSON.parse(accessTokenLocal);
    refreshToken = JSON.parse(refreshTokenLocal);
    role = JSON.parse(roleLocal);
    dispatch(saveUserLogin({ user, accessToken, refreshToken, role }));
  }

  return (
    <div className=''>
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path='' element={<GuestRoute />}>
            <Route path='/authenticate' element={<Authenticate />} />
          </Route>
          <Route path='' element={<AuthenticationRoute />}>
            <Route index element={<MainLayout page={<Home />} />} />
            <Route path='/wishlist' element={<MainLayout page={<Wishlist />} />} />
            <Route path='/detail-room/:id' element={<MainLayout page={<DetailRoom />} />} />
            <Route path='/host/:id' element={<MainLayout page={<HostInfo />} />} />
            <Route path='/become-host' element={<MainLayout page={<BecomeHost />} />} />
            <Route path='/list-booking-guest' element={<MainLayout page={<ListBookingGuest />} />} />
            <Route path='/info-account' element={<MainLayout page={<InfoAccount />} />} />
            <Route path='/booking-confirmed' element={<MainLayout page={<BookingConfirmed />} />} />
            <Route path='/booking-checked' element={<MainLayout page={<BookingChecked />} />} />
            <Route path='/host-manage-property' element={<MainLayout page={<BookingChecked />} />} />
          </Route>
          <Route element={<AdminLayout />}>
            <Route path='/admin' element={<Dashboard />} />
            <Route path='/admin-manage-accounts' element={<ManageAccount />} />
            <Route path='/admin-manage-properties' element={<ManageProperties />} />
            <Route path='/admin-manage-cancellation' element={<ManageCancellation />} />
            <Route path='/admin-manage-payments' element={<ManagePayment />} />
          </Route>
          <Route path='*' element={<PageNotFound />}></Route>
        </Routes>
        <ToastContainer
          style={{ fontFamily: 'Lexend', fontSize: '13px', width: `255px` }}
          // transition={Flip}
          position='top-center'
          autoClose={1200}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme='light'
        />
      </ThemeProvider>
    </div>
  );
}

export default App;
