import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter, useLocation } from 'react-router-dom';
import './index.css';
import Layout from './Layout';
import Home from './components/Home/Home';


// ScrollToTop component defined inline
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

// Layout component that includes ScrollToTop
const AppLayout= () => (
  <>
    <ScrollToTop />
    <Layout />
  </>
);

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />, // Use AppLayout which includes ScrollToTop
    children: [
      { path: '/', element: <Home /> },
      // { path: '/aboutus', element: <About /> },
      // { path: '/services', element: <Services /> },
      // { path: '/blog', element: <Blog /> },
      // { path: '/blog/:id', element: <BlogPage /> },
      // { path: '/insights', element: <Insights /> },
      // { path: '/gallery', element: <Gallery /> },
      // { path: '/contact-us', element: <Contact /> },
      // { path: '/login', element: <LoginAndSignup /> },
      // { path: '/signup', element: <LoginAndSignup /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
