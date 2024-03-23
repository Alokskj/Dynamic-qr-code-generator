import React from 'react'
import AuthProvider from './contexts/AuthProvider.jsx'
import { Route, RouterProvider, Routes, createBrowserRouter } from 'react-router-dom'
import Home from './pages/Home'
import Register from './pages/Register.jsx'
import Login from './pages/Login.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
const router = createBrowserRouter([
  {
    path:'/',
    element:(<ProtectedRoute><Home /></ProtectedRoute>)
  },
  {
    path:'/login',
    element:(<Login/>)
  },{
    path:"/register",
    element:(<Register/>)
  }
])
const App = () => {
  return (
    <>
    <RouterProvider router={router} />
    </>
  )
}

export default App