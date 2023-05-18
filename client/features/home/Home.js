import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import axios from "axios";
import {
  fetchTasks,
  selectTasks,
  updateTask,
  deleteTask,
} from "../slices/TaskSlice";
// import { subTaskSlice } from "../slices/SubTaskSlice";
import { selectProfileImageUrl, fetchUserImage } from "../slices/profileSlice";
/**
 * COMPONENT
 */
const Home = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [error, setError] = useState(null);
  const username = useSelector((state) => state.auth.me.username);

  const tasks = useSelector(selectTasks);

  const avatarUrl = useSelector(selectProfileImageUrl);
  console.log("avatarUrl", avatarUrl);

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

  const handleDelete = (taskId) => {
    dispatch(deleteTask(taskId));
    dispatch(fetchTasks());
  };
  const [filteredTasks, setFilteredTasks] = useState(topLevelTasks);
  useEffect(() => {
    const searchTasks = (tasks, searchTerm) => {
      const filteredTasks = tasks.filter((task) =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      tasks.forEach((task) => {
        if (task.subtasks) {
          const filteredSubtasks = searchTasks(task.subtasks, searchTerm);
          filteredTasks.push(...filteredSubtasks);
        }
      });

      return filteredTasks.filter((task) => !task.isCompleted);
    };
    const updatedFilteredTasks = searchTasks(topLevelTasks, search);
    setFilteredTasks(updatedFilteredTasks);
  }, [search, tasks]);

  useEffect(() => {
    dispatch(fetchUserImage());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchTasks());
    const getQuote = async () => {
      try {
        const storedQuote = JSON.parse(localStorage.getItem("quote"));
        if (
          storedQuote &&
          new Date(storedQuote.date).toDateString() ===
            new Date().toDateString()
        ) {
          setQuote(storedQuote.text);
          setAuthor(storedQuote.author);
        } else {
          const response = await fetch("https://type.fit/api/quotes");
          const data = await response.json();
          const randomQuote = data[Math.floor(Math.random() * data.length)];
          setQuote(randomQuote.text);
          setAuthor(randomQuote.author);
          localStorage.setItem(
            "quote",
            JSON.stringify({
              text: randomQuote.text,
              author: randomQuote.author,
              date: new Date().toDateString(),
            })
          );
        }
      } catch (error) {
        console.error(error);
        setError(error.message);
      }
    };
    getQuote();
  }, [dispatch]);

  const getGreeting = () => {
    const currentHour = new Date().getHours();
    if (currentHour >= 5 && currentHour < 12) {
      return "Good Morning";
    }
    if (currentHour >= 12 && currentHour < 18) {
      return "Good Afternoon";
    }
    return "Good Evening";
  };

  return (
    <div className="flex flex-col h-screen  md:px-10">
      <header className="flex flex-col items-center mt-10 mb-5 m-1">
        <h1 className="md:text-4xl text-lg text-white underline text-center">
          {getGreeting()}, {username}!
        </h1>
        {error && (
          <p className="md:text-lg text-red-500 text-center">{error}</p>
        )}
        {quote && (
          <p className="md:text-3xl text-white text-center">"{quote}"</p>
        )}
        {author && (
          <p className="md:text-3xl text-white text-center">-{author}</p>
        )}
        <img
          src={avatarUrl}
          alt="Profile"
          className="w-16 h-16 rounded-full my-4"
        />
        <h3 className="md:text-3xl text-lg text-white underline text-center m-1">
          Total Tasks Completed: {totalTasksCompleted.length}
        </h3>
      </header>
      <main className="overflow-auto md:mt-5 md:w-1/2 md:p-6 m-1 max-h-80 md:mx-auto rounded-md shadow-darker bg-blue-900">
        <div className="flex items-center justify-between mb-2 m-1">
          <div className="flex flex-grow">
            <input
              type="text"
              className="text-lg shadow rounded flex items-center justify-start p-2 border-b-2 border-white shadow-darker transition-colors"
              id="searchInput"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              getSubtasks={getSubtasks}
              handleUpdate={handleUpdate}
              handleDelete={handleDelete}
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
const TaskItem = ({ task, getSubtasks, handleUpdate, handleDelete }) => {
  const subtasks = getSubtasks(task.id);

  const dueDate = new Date(task.dueDate).toLocaleString();

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

        <span className="ml-4 text-sm text-white">Due: {dueDate}</span>

        <button
          className="text-red-500 ml-4"
          onClick={() => handleDelete(task.id)}
        >
          X
        </button>
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

          <button
            className="text-red-500 ml-4"
            onClick={() => handleDelete(subtask.id)}
          >
            X
          </button>
        </li>
      ))}
    </ul>
  );
};

export default Home;
