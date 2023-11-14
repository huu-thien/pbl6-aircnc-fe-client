import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';

import { Provider } from 'react-redux';
import { store } from '@/store.ts';

const clientID = import.meta.env.VITE_CLIENT_GOOGLE_ID;

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <Provider store={store}>
    <GoogleOAuthProvider clientId={clientID}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </GoogleOAuthProvider>
  </Provider>,
  // </React.StrictMode>,
);
