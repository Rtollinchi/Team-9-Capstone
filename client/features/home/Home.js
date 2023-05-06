import React from "react";
import { useSelector } from "react-redux";

/**
 * COMPONENT
 */
const Home = (props) => {
  const username = useSelector((state) => state.auth.me.username);
  const currentDate = new Date().toLocaleDateString();

  return (
    <div>
      <span>
        <h3>Welcome, {username}</h3>
        <h3>{currentDate}</h3>
        <h3>Total Tasks Completed:</h3>
      </span>
      <div className="scroll-box">
        <p>Scroll box content goes here</p>
        <p>Scroll box content goes here</p>
        <p>Scroll box content goes here</p>
        <p>Scroll box content goes here</p>
        <p>Scroll box content goes here</p>
        <p>Scroll box content goes here</p>
        <p>Scroll box content goes here</p>
        <p>Scroll box content goes here</p>
        <p>Scroll box content goes here</p>
        <p>Scroll box content goes here</p>
        <p>Scroll box content goes here</p>
        <p>Scroll box content goes here</p>
        <p>Scroll box content goes here</p>
        <p>Scroll box content goes here</p>
        <p>Scroll box content goes here</p>
        <p>Scroll box content goes here</p>
        <p>Scroll box content goes here</p>
        <p>Scroll box content goes here</p>
        <p>Scroll box content goes here</p>
        <p>Scroll box content goes here</p>
        <p>Scroll box content goes here</p>
        <p>Scroll box content goes here</p>
        <p>Scroll box content goes here</p>
        <p>Scroll box content goes here</p>
        <p>Scroll box content goes here</p>
        <p>Scroll box content goes here</p>
        <p>Scroll box content goes here</p>
      </div>
    </div>
  );
};

export default Home;
