import React from 'react'
import Dashboard from './components/Landing-Page/Dashboard'
import Home from './components/Home'
import Forgot from './components/Forgot'
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

  ])

  return (
    <div>
      <RouterProvider router={router}/>
    </div>
  )
}

export default App
