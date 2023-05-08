import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import DatePicker from "react-datepicker";

import { addTask } from "../slices/TaskSlice";

const AddTask = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [priority, setPriority] = useState();
  const [dueDate, setDueDate] = useState(new Date());

  const handleSubmit = async (evt) => {
    await evt.preventDefault();
    dispatch(addCardAsync({ title, description, dueDate, priority }));
    setTitle("");
    setDescription("");
    setPriority("");
    setDueDate("");
  };
  return (
    <div>
      <h1>add task here</h1>
      <form id="task-form" onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label htmlFor="description">Description:</label>
        <input
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <DatePicker selected={dueDate} onChange={(date) => setDueDate(date)} />
        <label htmlFor="priority">Priority:</label>
        <select
          name="priority"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
export default AddTask;
