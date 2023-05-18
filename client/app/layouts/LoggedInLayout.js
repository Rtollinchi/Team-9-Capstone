import React from "react";
import Navbar from "../../features/navbar/Navbar";

const LoggedInLayout = ({ children }) => {
  return (
    <div className="flex w-full h-full">
      <div className="w-1/12  ">
        <Navbar />
      </div>
      <div className="w-full">{children}</div>
    </div>
  );
};

export default LoggedInLayout;
