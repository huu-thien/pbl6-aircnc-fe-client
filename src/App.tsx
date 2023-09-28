import { Routes, Route } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout/MainLayout';
import AuthenticationRoute from '@/routes/authenticate-route';
import Authenticate from '@/pages/Authenticate';
import PageNotFound from '@/pages/PageNotFound';
import GuestRoute from '@/routes/guest-route';

import { createTheme, ThemeProvider } from '@mui/material';
import Home from './pages/Home';
import Wishlist from './pages/Wishlist';

function App() {
  const theme = createTheme({
    typography: {
      fontFamily: 'Lexend',
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path="" element={<GuestRoute />}>
          <Route path="/authenticate" element={<Authenticate />} />
        </Route>

        <Route path="" element={<AuthenticationRoute />}>
          <Route index element={<MainLayout page={<Home />} />} />
          <Route path="/wishlist" element={<MainLayout page={<Wishlist />}/>} />
        </Route>

        <Route path="*" element={<PageNotFound />}></Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;
