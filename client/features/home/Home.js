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
    <div className="min-h-screen flex flex-col items-start justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div className="w-full space-y-8 p-4">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Welcome, {username}
          </h2>
          <h3 className="text-center text-lg text-gray-700">{currentDate}</h3>
          <h3 className="text-center text-lg text-gray-700">Total Tasks Completed: {totalTasksCompleted.length}</h3>
        </div>
        <div className="rounded-md shadow-sm border border-gray-400 p-4">
          {topLevelTasks.length > 0 ? (
            topLevelTasks.map((task) => {
              const subtasks = getSubtasks(task.id);
              return (
                <ul key={task.id} className="list-decimal pl-5 space-y-2">
                  <li className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      className="form-checkbox h-4 w-4 text-indigo-600 border border-gray-300 rounded transition duration-150 ease-in-out bg-gray-200"
                      checked={task.isCompleted}
                      onChange={() => {
                        handleUpdate(task.id);
                      }}
                    />
                    <span className="text-gray-700">{task.title}</span>
                  </li>
                  {subtasks.length > 0 &&
                    subtasks.map((subtask) => (
                      <li key={subtask.id} className="list-none flex items-center space-x-2 ml-5">
                        <input
                          type="checkbox"
                          className="form-checkbox h-4 w-4 text-indigo-600 border border-gray-300 rounded transition duration-150 ease-in-out bg-gray-200"
                          checked={task.isCompleted}
                          onChange={() => {
                            handleUpdate(task.id);
                          }}
                        />
                        <span className="text-gray-700">{subtask.title}</span>
                      </li>
                    ))}
                </ul>
              );
            })
          ) : (
            <p className="text-gray-700">No tasks</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
