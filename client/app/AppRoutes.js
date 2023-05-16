import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import AuthForm from "../features/auth/AuthForm";
import Home from "../features/home/Home";
import { me } from "./store";
import AddTask from "../features/addTask/AddTask";
// import AddSubTask from "../features/addSubTask/AddSubTask";
import Calendar from "../features/calendar/Calendar";
import Profile from "../features/ProfileImage/profile";
import SignUpForm from "../features/auth/SignUpForm";
import LoggedInLayout from "./layouts/LoggedInLayout";
import LoggedOutLayout from "../app/layouts/LoggedOutLayout";

/**
 * COMPONENT
 */

const AppRoutes = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(me());
  }, []);

  return (
    <div className="bg-gradient-to-r from-red-600 to-yellow-400 h-screen-viewport w-screen-viewport items-center">
      {isLoggedIn ? (
        <LoggedInLayout>
          <Routes>
            <Route path="/*" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/home" element={<Home />} />
            <Route path="/newtasks" element={<AddTask />} />
            {/* <Route path="/addSubTask" element={<AddSubTask />} /> */}
            <Route path="/calendar" element={<Calendar />} />
          </Routes>
        </LoggedInLayout>
      ) : (
        <LoggedOutLayout>
          <Routes>
            <Route
              path="/*"
              element={<AuthForm name="login" displayName="Login" />}
            />
            <Route
              path="/login"
              element={<AuthForm name="login" displayName="Login" />}
            />
            <Route
              path="/signup"
              element={<SignUpForm name="signup" displayName="Sign Up" />}
            />
          </Routes>
        </LoggedOutLayout>
      )}
    </div>
  );
};

export default AppRoutes;
