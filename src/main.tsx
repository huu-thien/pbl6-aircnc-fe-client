import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
const clientID = '486089736533-02ujmkoe4o2qfa8e5fdne829bjrmt5n1.apps.googleusercontent.com';

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <GoogleOAuthProvider clientId={clientID}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </GoogleOAuthProvider>,
  // </React.StrictMode>,
);
