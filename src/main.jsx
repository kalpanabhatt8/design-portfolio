// import React, { useEffect } from 'react'
// import  ReactDOM  from 'react-dom/client'
// import { createBrowserRouter, RouterProvider, useLocation } from 'react-router-dom'
// import './index.css'
// import Layout from './Layout';


// const ScrollToTop = () => {
//   const { pathname } = useLocation();

//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, [pathname]);

//   return null;
// };

// const AppLayout= () => (
//   <>
//     <ScrollToTop />
//     {/* <Layout /> */}
//   </>
// );


// const router=createBrowserRouter([
//   {
//     path:'/',
//     element: <AppLayout />,
//     // children:[
//     //   {
//     //     path:'/',
//     //     element:<Home/>
//     //   },
    
//     // ]
//   }
// ])

// ReactDOM.createRoot(document.getElementById('root')).render(

//   <React.StrictMode>
//     <RouterProvider router={router}/>
//   </React.StrictMode>,
// )
// main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
