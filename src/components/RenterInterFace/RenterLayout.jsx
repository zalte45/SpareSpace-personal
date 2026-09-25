import React from "react";
import { Outlet } from "react-router-dom";
import RenterNavbar from "./RenterNavbar";
import Footer from "../Landing-Page/Footer";

const RenterLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 font-sans text-gray-900">
      <RenterNavbar />
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default RenterLayout;
