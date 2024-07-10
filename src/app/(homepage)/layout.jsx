
import Navbar from "@/components/_UI/NavBar";
import SideBar from "@/components/_UI/SideBar";
import React from "react";

const layout = ({ children }) => {
  return (
    <div className="flex h-screen overflow-hidden">
      <SideBar />
      <div className="flex flex-col flex-1">
        <Navbar />
        <div className="px-4 py-1 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
};

export default layout;
