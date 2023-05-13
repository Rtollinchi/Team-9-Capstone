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
    <div className="flex flex-col h-screen w-screen">
      <div className="self-center">
        <h1 className="text-4xl">Welcome, {username}</h1>
        <h2 className="text-4xl">{currentDate}</h2>
        <h3 className="text-4xl">
          Total Tasks Completed: {totalTasksCompleted.length}{" "}
        </h3>
      </div>
      <div
        className="content-center  self-center rounded p-4 max-h-80  scrollbar-hide overflow-auto w-1/2 text-2xl my-5 resize rounded-md min-w-[20%] max-w-[70%]"
        style={{ boxShadow: "0px 0px 25px rgba(0, 0, 0, 0.5)" }}
      >
        {topLevelTasks.length > 0 ? (
          topLevelTasks.map((task) => {
            const subtasks = getSubtasks(task.id);
            return (
              <ul key={task.id} className="list-none my-2 p-1 text-center ">
                <li className="text-4xl shadow-lg rounded-full flex items-center justify-center">
                  <input
                    type="checkbox"
                    className="form-checkbox h-4 w-4 rounded-full bg-gray-200 m-4"
                    checked={task.isCompleted}
                    onChange={() => {
                      handleUpdate(task.id);
                    }}
                  />
                  <span className="flex-1">{task.title}</span>
                </li>
                {subtasks.length > 0 &&
                  subtasks.map((subtask) => (
                    <li
                      key={subtask.id}
                      className="list-none text-center indent-2"
                    >
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
          <p className="text-center">No tasks</p>
        )}
      </div>
    </div>
  );
};

export default Home;
