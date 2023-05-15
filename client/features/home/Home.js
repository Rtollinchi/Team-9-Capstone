import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks } from "../slices/TaskSlice";
import { selectTasks } from "../slices/TaskSlice";
// import { subTaskSlice } from "../slices/SubTaskSlice";
import { updateTask } from "../slices/TaskSlice";
import profileSlice from "../slices/profileSlice";
import { selectProfileImageUrl, selectEmail } from "../slices/profileSlice";
/**
 * COMPONENT
 */
const Home = () => {
  const dispatch = useDispatch();

  const username = useSelector((state) => state.auth.me.username);
  const avatarUrl = useSelector((state) => state.auth.me.avatarUrl);
  const tasks = useSelector(selectTasks);
  const profileImageUrl = useSelector(selectProfileImageUrl);
  const email = useSelector(selectEmail);
  const currentDate = new Date().toLocaleDateString();
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
    dispatch(fetchTasks());
  }, [dispatch]);
  console.log("tasks", tasks);

  return (
    <div className="border-x-2">
      <span>
        <h3>Welcome, {username}</h3>
        <h3>{currentDate}</h3>
        <h3>Total Tasks Completed: {totalTasksCompleted.length} </h3>
      </span>
      <div className="scroll-box rounded-md border-2 border-black">
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
          className="list-none text-center indent-2 text-sm ml-8"
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
