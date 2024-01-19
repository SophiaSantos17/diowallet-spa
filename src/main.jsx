import './index.css'
import React from 'react'
import ReactDOM from 'react-dom/client';
import Signin from './pages/signin.jsx';
import Signup from './pages/signup.jsx';
import Home  from './pages/home.jsx';
import NewTransaction from './pages/newTransaction.jsx';
import ErrorPage from './pages/errorPage.jsx';
import UserPage from './pages/userPage.jsx';
import EditTransaction from './pages/editTransaction.jsx';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage/>
  },
  {
    path: "/signin",
    element: <Signin/>,
  },
  {
    path: "/signup",
    element: <Signup/>,
  },
  {
    path: "/transaction/:type",
    element: <NewTransaction/>,
  },
  {
    path: "/user/:id",
    element: <UserPage/>,
  },
  {
    path: "/editTransaction/:id",
    element: <EditTransaction/>,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
