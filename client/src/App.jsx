import React from "react";
import AuthProvider from "./contexts/AuthProvider.jsx";
import {
  Route,
  RouterProvider,
  Routes,
  createBrowserRouter,
} from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import { QrCodeScan } from "./components/QrCodeScan.jsx";
import ErrorPage from "./components/error-page.jsx";
import Header from "./components/Header.jsx";
import PageLayout from "./components/PageLayout.jsx";
import UpdateQr from "./pages/UpdateQr.jsx";
import {BulkCreate} from "./pages/BulkCreate.jsx";
import UserQrCodesPage from "./pages/UserQrCodesPage.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <PageLayout />,
    children: [
      {
        path: "/",
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: "/scan",
        element: (
          <ProtectedRoute>
            <QrCodeScan />
          </ProtectedRoute>
        ),
      },
      {
        path: "/update-qrcode/:id",
        element: (
          <ProtectedRoute>
            <UpdateQr />
          </ProtectedRoute>
        ),
      },
      {
        path: "/generate",
        element: (
          <ProtectedRoute>
            <BulkCreate />
          </ProtectedRoute>
        ),
      },
      {
        path: "/qr-codes",
        element: (
          <ProtectedRoute>
            <UserQrCodesPage />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);
const App = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
