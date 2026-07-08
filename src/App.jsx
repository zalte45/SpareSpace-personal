import React from 'react'
import Dashboard from './components/Landing-Page/Dashboard'
import Home from './components/Authentication/Home'
import Forgot from './components/Authentication/Forgot'
import Verify from './components/Authentication/Verify'
import DashBoard from './components/DashBoard/DashBoard'


import { createBrowserRouter, RouterProvider } from 'react-router-dom'




function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <><Dashboard/></>
    },
    {
      path: "/Forgot",
      element: <><Forgot/></>
    },
    {
      path: "/SignIn-Up",
      element: <><Home/></>
    },
    {
      path: "/Verify",
      element: <><Verify/></>
    },
    {
      path: "/DashBoard",
      element: <><DashBoard/></>
    },

  ])

  return (
    <div>
      <RouterProvider router={router}/>
    </div>
  )
}

export default App
