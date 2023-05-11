import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectOptions } from "../slices/TaskSlice";
import { addTasks } from "../slices/TaskSlice";
import { fetchOptions } from "../slices/TaskSlice";
import { fetchTasks } from "../slices/TaskSlice";
import { selectTasks } from "../slices/TaskSlice";

const AddTask = () => {
  const dispatch = useDispatch("");

  //const [, set] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Low");
  const [parentTaskId, setParentTaskId] = useState("");
  const priorityOptions = useSelector(selectOptions);
  //using react datepicker to grab current date
  const [dueDate, setDueDate] = useState(new Date());
  const tasks = useSelector(selectTasks);
  //grabbing current user to attach userId to task
  const currentUser = useSelector((state) => state.auth.me);
  const userId = currentUser.id;

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const handleSubmit = async (e) => {
    await e.preventDefault();
    console.log(parentTaskId);
    if (!parentTaskId) {
      dispatch(addTasks({ title, description, priority, userId }));
    } else {
      const parentId = parseInt(parentTaskId);
      console.log(parentId);
      dispatch(addTasks({ title, description, priority, userId, parentId }));
    }
    setTitle("");
    setDescription("");
    setPriority("Low");
    setDueDate("");
  };
  useEffect(() => {
    dispatch(fetchOptions());
  }, [dispatch]);

  return (
    <div>
      <h1>add task here</h1>
      <form id="task-form" onSubmit={handleSubmit}>
        <label htmlFor="Task List">Add as a subtask:</label>
        <select
          id="Task List"
          name="Task List"
          value={tasks.id}
          onChange={(e) => setParentTaskId(e.target.value)}
        >
          <option>Not a subtask</option>
          {tasks.map((task) => (
            <option key={task.id} value={task.id}>
              {task.title}
            </option>
          ))}
        </select>
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
              {option.value}
            </option>
          ))}
        </select>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
export default AddTask;
