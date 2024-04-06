import React from "react";
import { Sidebar } from "../Sidebar/Sidebar";

const Layout = ({ children }) => {
  return (
    <div className="w-screen h-screen flex flex-row justify-start">
      <Sidebar />
      <div className="bg-primary flex-1 text-white">
          {children}
      </div>
    </div>
  );
};

export default Layout;