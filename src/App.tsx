
import { Routes, Route } from 'react-router-dom';
import './App.css';


import MainLayout from '@/layouts/MainLayout/MainLayout';
import AuthenticationRoute from '@/routes/authenticate-route';
import Authenticate from '@/pages/Authenticate';
import PageNotFound from '@/pages/PageNotFound';
import GuestRoute from '@/routes/guest-route';

import { createTheme, ThemeProvider } from '@mui/material';

function App() {
  const theme = createTheme({
    typography: {
      fontFamily: 'Lexend',
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path="/" element={<GuestRoute />}>
          <Route path="/authenticate" element={<Authenticate />} />
        </Route>

        <Route path="/" element={<AuthenticationRoute />}>
          <Route index element={<MainLayout />} />
        </Route>

        <Route path="*" element={<PageNotFound />}></Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;
