import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask } from "../slices/TaskSlice";

const AddTask = () => {
  const dispatch = useDispatch;

  return (
    <div>
      <h1>add task here</h1>
    </div>
  );
};
export default AddTask;
