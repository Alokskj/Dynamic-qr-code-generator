import React from "react";
import Header from "./Header";
import BottomNav from "./BottomNav";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const PageLayout = () => {
  return (
    <div>
      <Header />
      <ToastContainer />
      <BottomNav />
      <Outlet />
    </div>
  );
};

export default PageLayout;
