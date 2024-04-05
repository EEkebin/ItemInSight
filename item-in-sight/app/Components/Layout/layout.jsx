import React from "react";
import { Sidebar } from "../Sidebar/Sidebar";

const Layout = ({ children }) => {
  return (
    <div className="w-200 h-screen flex flex-row justify-start">
      <h1>Test Sidebar</h1>
      <Sidebar />
      <div className="bg-primary flex-1 p-4 text-white">
          {children}
      </div>
    </div>
  );
};

export default Layout;