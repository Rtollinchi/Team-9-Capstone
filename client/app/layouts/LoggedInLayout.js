import React from "react";
import Navbar from "../../features/navbar/Navbar";

const LoggedInLayout = ({ children }) => {
  return (
    <div className="flex">
      <div className="w-1/6">
        <Navbar />
      </div>
      <div className="w-full">{children}</div>
    </div>
  );
};

export default LoggedInLayout;
