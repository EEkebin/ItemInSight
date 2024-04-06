import React from "react";
import { Navbar } from "../Navbar/Navbar";

const Layout = ({ children }) => {
  return (
    <div className="w-screen h-screen flex flex-col justify-start bg-main-background">
      <Navbar />
      <div className="bg-primary flex-1 text-white">
          {children}
      </div>
    </div>
  );
};

export default Layout;