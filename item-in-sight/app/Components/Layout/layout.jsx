import React from "react";
import { Navbar } from "../Navbar/Navbar";

// Layout component responsible for rendering the Navbar and children components
const Layout = ({ children }) => {
  return (
    <div className="w-screen h-screen flex flex-col justify-start bg-main-background overflow-auto">
      {/* Rendering the Navbar component */}
      <Navbar />
       {/* Container for the main content, filling the remaining space and styled with primary background color */}
      <div className="bg-primary flex-1 text-white">
          {children}
      </div>
    </div>
  );
};

export default Layout;