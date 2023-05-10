import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectOptions } from "../slices/TaskSlice";
import { addTasks } from "../slices/TaskSlice";
import { fetchOptions } from "../slices/TaskSlice";
const AddTask = () => {
  const dispatch = useDispatch("");

  //const [, set] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");
  const priorityOptions = useSelector(selectOptions);
  //using react datepicker to grab current date
  const [dueDate, setDueDate] = useState(new Date());

  //grabbing current user to attach userId to task
  const currentUser = useSelector((state) => state.auth.me);
  const userId = currentUser.id;

  const handleSubmit = async (e) => {
    await e.preventDefault();
    dispatch(addTasks({ title, description, priority, userId }));
    setTitle("");
    setDescription("");
    setPriority("");
    setDueDate("");
  };
  useEffect(() => {
    dispatch(fetchOptions());
  }, [dispatch]);
  console.log("options", priorityOptions);
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

        <label htmlFor="priority">Priority:</label>
        <select
          id="priority"
          name="priority"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          {priorityOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
export default AddTask;
