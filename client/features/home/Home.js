import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { fetchTasks } from "../slices/TaskSlice";
import { selectTasks } from "../slices/TaskSlice";
// import { subTaskSlice } from "../slices/SubTaskSlice";
import { updateTask } from "../slices/TaskSlice";
import { selectProfileImageUrl, fetchUserImage } from "../slices/profileSlice";
/**
 * COMPONENT
 */
const Home = () => {
  const dispatch = useDispatch();

  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [error, setError] = useState(null);
  const username = useSelector((state) => state.auth.me.username);
  const tasks = useSelector(selectTasks);

  const avatarUrl = useSelector(selectProfileImageUrl);
  // const email = useSelector(selectEmail);
  // const currentDate = new Date().toLocaleDateString();
  const totalTasksCompleted = tasks.filter((task) => task.isCompleted === true);

  const topLevelTasks = tasks.filter(
    (task) => !task.parentId && !task.isCompleted
  );
  const getSubtasks = (taskId) => {
    return tasks.filter(
      (task) => task.parentId === taskId && !task.isCompleted
    );
  };
  const handleUpdate = (taskId) => {
    const taskToUpdate = tasks.find((task) => task.id === taskId);
    const updatedTask = { ...taskToUpdate, isCompleted: true };
    dispatch(updateTask(updatedTask));
  };
  useEffect(() => {
    dispatch(fetchUserImage());
  }, [dispatch]);
  useEffect(() => {
    dispatch(fetchTasks());

    const getQuote = async () => {
      const options = {
        method: "GET",
        url: "https://quotes-inspirational-quotes-motivational-quotes.p.rapidapi.com/quote",
        params: { token: "ipworld.info" },
        headers: {
          "X-RapidAPI-Key":
            "b159225c68msh5fd1fb52aa0baffp1d930bjsn15ba437e2687",
          "X-RapidAPI-Host":
            "quotes-inspirational-quotes-motivational-quotes.p.rapidapi.com",
        },
      };

      try {
        const response = await axios.request(options);
        setQuote(response.data);
        setAuthor(response.data.author);
        console.log(response.data);
      } catch (error) {
        console.error(error);
        setError(error.message);
      }
    };

    getQuote();
  }, [dispatch]);

  return (
    <div className="flex flex-col h-screen  px-10">
      <header className="flex flex-col items-center mt-10 mb-5">
        <h1 className="text-2xl text-white underline">Welcome, {username}!</h1>
        {error && <p className="text-lg text-red-500">{error}</p>}
        {author && <p className="text-2xl text-white">-{author}</p>}
        {quote && <p className="text-2xl text-white">"{quote.text}"</p>}
        <img
          src={avatarUrl}
          alt="Profile"
          className="w-16 h-16 rounded-full my-4"
        />

        <h3 className="text-2xl text-white underline">
          Total Tasks Completed: {totalTasksCompleted.length}
        </h3>
      </header>

      <main className="overflow-auto p-6 mt-5 w-1/2 max-h-80 mx-auto rounded-md shadow-darker bg-blue-900">
        {topLevelTasks.length > 0 ? (
          topLevelTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              getSubtasks={getSubtasks}
              handleUpdate={handleUpdate}
            />
          ))
        ) : (
          <p className="text-center text-gray-500">No tasks</p>
        )}
      </main>
    </div>
  );
};

// Extracted TaskItem component
const TaskItem = ({ task, getSubtasks, handleUpdate }) => {
  const subtasks = getSubtasks(task.id);

  return (
    <ul className="list-none my-2 p-1">
      <li className="text-lg shadow- rounded flex items-center justify-start mb-2 p-2 border-b-2 border-white shadow-darker hover:bg-gray-500 transition-colors">
        <input
          type="checkbox"
          className="form-checkbox h-4 w-4 rounded bg-gray-200 mr-4 shadow-darker"
          checked={task.isCompleted}
          onChange={() => handleUpdate(task.id)}
        />
        <span className="flex-1 text-white">{task.title}</span>
      </li>
      {subtasks.map((subtask) => (
        <li
          key={subtask.id}
          className="list-none text-center indent-2 text-sm ml-8 text-white text-lg"
        >
          <input
            type="checkbox"
            className="form-checkbox h-4 w-4 text-indigo-600 border border-gray-300 rounded transition duration-150 ease-in-out bg-gray-200 mr-2"
            checked={subtask.isCompleted}
            onChange={() => handleUpdate(subtask.id)}
          />
          {subtask.title}
        </li>
      ))}
    </ul>
  );
};

export default Home;
