import React from "react";
import { useSelector } from "react-redux";
import AppRoutes from "./AppRoutes";

const App = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);

  return (
    <div>
      {isLoggedIn ? (
        <div>
          <AppRoutes />
        </div>
      ) : (
        <AppRoutes />
      )}
    </div>
  );
};

export default App;
