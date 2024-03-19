import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Login from './conponents/Logcard.jsx'
import SignUp from './conponents/signupcard.jsx'
import Mycoll from './conponents/Mycoll.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './conponents/home.jsx'
const router = createBrowserRouter([
  {
  path: '/',
  element: <App />,
  children: [
    {
      path: 'Home',
      element: <Home />
    },
    {
      path: 'Login',
      element: <Login />
    },
    {
      path: 'SignUP',
      element: <SignUp />
    },
    {
      path:"Mycoll",
      element:<Mycoll />
    }
  ]
}
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);
