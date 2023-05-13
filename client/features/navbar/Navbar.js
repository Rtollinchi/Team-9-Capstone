import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../app/store";

const Navbar = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutAndRedirectHome = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="fixed h-screen bg-gray-50 p-0">
      <div className="flex flex-col items-center justify-between h-full">
        {" "}
        {/* Added classes for flex layout and padding */}
        <nav>
          {isLoggedIn ? (
            <div>
              <Link to="/home">
                <img className="w-20 h-20 mb-10" src="home.png" />{" "}
                {/* Increased size and added bottom margin */}
              </Link>
              <Link to="/calendar">
                <img className="w-20 h-20 mb-10" src="calendar.png" />{" "}
                {/* Increased size and added bottom margin */}
              </Link>
              <Link to="/newtasks">
                <img className="w-20 h-20 mb-10" src="add.png" />{" "}
                {/* Increased size and added bottom margin */}
              </Link>
              <Link to="/profile">
                <img className="w-20 h-20 mb-10" src="user.png" />{" "}
                {/* Increased size and added bottom margin */}
              </Link>
              <button type="button" onClick={logoutAndRedirectHome}>
                <img className="w-20 h-20 mb-10" src="exit_480.png" />{" "}
                {/* Increased size and added bottom margin */}
              </button>
            </div>
          ) : (
            <div>
              {/* The navbar will show these links before you log in */}
              <Link to="/login">Login</Link>
              <Link to="/signup">Sign Up</Link>
            </div>
          )}
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
