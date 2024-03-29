import React from "react";
import Header from "./Header";
import BottomNav from "./BottomNav";
import { Outlet } from "react-router-dom";

const PageLayout = () => {
  return (
    <div>
      <Header />
      <BottomNav />
      <Outlet />
    </div>
  );
};

export default PageLayout;
