import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import { addSubTasks } from "../slices/SubTaskSlice";
import { fetchTasks } from "../slices/TaskSlice";
import { selectTasks } from "../slices/TaskSlice";

// import { addSubTask } from "../slices/TaskSlice

const AddSubTask = () => {
  const dispatch = useDispatch("");
  const [task, setTask] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");
  // using react datepicker to grab current date
  const [dueDate, setDueDate] = useState(new Date());
  const currentUser = useSelector((state) => state.auth.me);
  const userId = currentUser.id;
  useEffect(() => {
    dispatch(fetchTasks(userId));
  }, []);

  const tasks = useSelector(selectTasks);
  console.log("tasks", tasks);
  const handleSubmit = (e) => {
    e.preventDefault();
    const taskId = task.id;
    console.log("///////line 30", taskId);
    dispatch(addSubTasks({ title, description, priority, dueDate, taskId }));
    setTitle("");
    setDescription("");
    setPriority("");
    setDueDate("");
  };

  return (
    <div>
      <h1>add subtask here</h1>
      <form id="subtask-form" onSubmit={handleSubmit}>
        <select onChange={(e) => setTask(e.target.value)}>
          {tasks.map((task) => (
            <option key={task.id} value={task.id}>
              {task.name}{" "}
            </option>
          ))}
        </select>
        <label htmlFor="title">Title</label>
        <input
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <DatePicker
          className="border rounded"
          selected={dueDate}
          onChange={(date) => setDueDate(date)}
        />
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
export default AddSubTask;
