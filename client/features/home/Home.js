import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks } from "../slices/TaskSlice";
import { selectTasks } from "../slices/TaskSlice";
// import { subTaskSlice } from "../slices/SubTaskSlice";
import { updateTask } from "../slices/TaskSlice";
/**
 * COMPONENT
 */
const Home = () => {
  const dispatch = useDispatch();

  const username = useSelector((state) => state.auth.me.username);
  const tasks = useSelector(selectTasks);
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
    <div className="flex items-center justify-center h-screen-viewport w-screen-viewport">
      <span>
        <h1 className="self-center">Welcome, {username}</h1>
        <h2 className="self-center">{currentDate}</h2>
        <h3 className="self-center">
          Total Tasks Completed: {totalTasksCompleted.length}{" "}
        </h3>
      </span>
      <div className="border border-gray-600 rounded p-4 max-h-64 shadow-sm overflow-auto w-1/2 scrollbar-hide">
        {topLevelTasks.length > 0 ? (
          topLevelTasks.map((task) => {
            const subtasks = getSubtasks(task.id);
            return (
              <ul key={task.id} className="list-none">
                <li>
                  <input
                    type="checkbox"
                    className="form-checkbox h-4 w-4 text-indigo-600 border border-gray-600 rounded shadow-sm transition duration-150 ease-in-out bg-gray-200"
                    checked={task.isCompleted}
                    onChange={() => {
                      handleUpdate(task.id);
                    }}
                  />
                  {task.title}
                </li>
                {subtasks.length > 0 &&
                  subtasks.map((subtask) => (
                    <li key={subtask.id} className="list-none">
                      <input
                        type="checkbox"
                        className="form-checkbox h-4 w-4 text-indigo-600 border border-gray-300 rounded transition duration-150 ease-in-out bg-gray-200"
                        checked={task.isCompleted}
                        onChange={() => {
                          handleUpdate(task.id);
                        }}
                      />
                      {subtask.title}
                    </li>
                  ))}
              </ul>
            );
          })
        ) : (
          <p>No tasks</p>
        )}
      </div>
    </div>
  );
};

export default Home;
