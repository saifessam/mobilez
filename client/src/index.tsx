import React from 'react';
import { CookiesProvider } from 'react-cookie';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import MainLayout from './layouts/main';
import './styles/app.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <CookiesProvider>
      <BrowserRouter>
        <MainLayout />
      </BrowserRouter>
    </CookiesProvider>
  </React.StrictMode>
);