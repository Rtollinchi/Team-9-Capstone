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
    <div className='navbar'>
      <h1>CHANGE MY NAME</h1>
      <nav>
        {isLoggedIn ? (
          <div>
            {/* The navbar will show these links after you log in */}
            <Link to="/home">
              <img src="home.png" />
            </Link>
            <Link to="/calendar">
              <img src="calendar.png" />
            </Link>
            <Link to="/addTask">
              <img src="add.png" />
            </Link>
            <Link to="/addSubTask">
              <img src="add-subtask.png" />
            </Link>
            <Link to="/profile">
              <img src="user.png" />
            </Link>
            <button type="button" onClick={logoutAndRedirectHome}>
              <img src="exit_480.png" />
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
      <hr />
    </div>
  );
};

export default Navbar;
