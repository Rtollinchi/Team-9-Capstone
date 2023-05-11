import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks } from "../slices/TaskSlice";
import { selectTasks } from "../slices/TaskSlice";
import { subTaskSlice } from "../slices/SubTaskSlice";
/**
 * COMPONENT
 */
const Home = () => {
  const dispatch = useDispatch();

  const username = useSelector((state) => state.auth.me.username);
  const tasks = useSelector(selectTasks);
  const currentDate = new Date().toLocaleDateString();

  const topLevelTasks = tasks.filter((task) => !task.parentId);
  const getSubtasks = (taskId) => {
    return tasks.filter((task) => task.parentId === taskId);
  };
  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);
  console.log("tasks", tasks);
  return (
    <div>
      <span>
        <h3>Welcome, {username}</h3>
        <h3>{currentDate}</h3>
        <h3>Total Tasks Completed: </h3>
      </span>
      {/* <div className="scroll-box">
        <ul>
          {tasks.length > 0 ? (
            tasks.map((task) => {
              return <li key={`${task.id}`}>{task.title}</li>;
            })
          ) : (
            <li>No Tasks</li>
          )}
        </ul>
        <p>Scroll box content goes here</p>
      </div> */}
      <div className="scroll-box">
        {topLevelTasks.length > 0 ? (
          topLevelTasks.map((task) => {
            const subtasks = getSubtasks(task.id);
            return (
              <ul key={task.id}>
                <li>{task.title}</li>
                {subtasks.length > 0 &&
                  subtasks.map((subtask) => (
                    <li key={subtask.id}>{subtask.title}</li>
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
