import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter, useLocation } from 'react-router-dom';
import { ThemeProvider } from './utils/ThemeContext';
import './index.css';
import Layout from './Layout';
import Home from './components/Home';

// ScrollToTop component
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

// Layout wrapper
const AppLayout = () => (
  <>
    <ScrollToTop />
    <Layout />
  </>
);

// Define router
const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { path: '/', element: <Home /> },
    ],
  },
]);

// Render the app with RouterProvider wrapped in ThemeProvider
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
);
