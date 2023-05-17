import React from "react";
import { useSelector } from "react-redux";
import AppRoutes from "./AppRoutes";
import { selectProfileImageUrl } from "../features/slices/profileSlice";
const App = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);

  return (
    <div>
      {isLoggedIn ? (
        <div>
          <AppRoutes />
          <div className="fixed bottom-0 right-0 p-6">
            <img src="genie.png" alt="Genie Logo" className="h-24 w-24" />
          </div>
        </div>
      ) : (
        <AppRoutes />
      )}
    </div>
  );
};

export default App;
