import React from "react";
import { useSelector } from "react-redux";
import Navbar from "../features/navbar/Navbar";
import AppRoutes from "./AppRoutes";

const App = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  return (
    <div>
      {isLoggedIn ? (
        <div>
          <Navbar />
          <AppRoutes />
        </div>
      ) : (
        <AppRoutes />
      )}
    </div>
  );
};

export default App;
