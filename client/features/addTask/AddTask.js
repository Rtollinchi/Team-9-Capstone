import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectOptions } from "../slices/TaskSlice";
import { addTasks } from "../slices/TaskSlice";
import { fetchOptions } from "../slices/TaskSlice";
import { fetchTasks } from "../slices/TaskSlice";
import { selectTasks } from "../slices/TaskSlice";

function formatDate(date) {
  let d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear(),
    hours = "" + d.getHours(),
    minutes = "" + d.getMinutes();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;
  if (hours.length < 2) hours = "0" + hours;
  if (minutes.length < 2) minutes = "0" + minutes;

  return [month, day, year].join("/") + " " + [hours, minutes].join(":");
}

const AddTask = () => {
  const dispatch = useDispatch("");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Low");
  const [parentTaskId, setParentTaskId] = useState("");
  const priorityOptions = useSelector(selectOptions);
  const [dueDate, setDueDate] = useState(new Date());
  const tasks = useSelector(selectTasks);
  const currentUser = useSelector((state) => state.auth.me);
  const userId = currentUser.id;

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);
  const topLevelTasks = tasks.filter(
    (task) => !task.parentId && !task.isCompleted
  );

  const handleSubmit = async (e) => {
    await e.preventDefault();
    console.log(parentTaskId);
    if (!parentTaskId) {
      dispatch(addTasks({ title, description, priority, userId, dueDate }));
    } else {
      const parentId = parseInt(parentTaskId);
      console.log(parentId);
      dispatch(
        addTasks({ title, description, priority, userId, parentId, dueDate })
      );
    }
    setTitle("");
    setDescription("");
    setPriority("Low");
    setDueDate(new Date());
  };
  useEffect(() => {
    dispatch(fetchOptions());
  }, [dispatch]);

  return (
    <div className="flex flex-col min-h-screen px-10">
      <header className="flex justify-center items-center mt-10 mb-5">
        <h1 className="text-4xl text-white underline">
          Add A Task Or A Subtask
        </h1>
      </header>

      <main className="overflow-auto p-6 mt-5 w-1/2 max-h-81 mx-auto rounded-md shadow-darker bg-blue-900">
        <form
          id="task-form"
          onSubmit={handleSubmit}
          className=" text-white space-y-4"
        >
          <div>
            <label
              htmlFor="title"
              className="block text-lg font-medium text-white "
            >
              Title:
            </label>
            <input
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="bg-blue-900 mt-1 block w-full rounded-md border-b-2 border-white outline-none"
              style={{ boxShadow: "5px 5px 10px rgba(0,0,0,0.3)" }}
            />
          </div>

          <div>
            <label
              htmlFor="date"
              className="block text-lg font-medium text-white"
            >
              Due date{" "}
            </label>
            <input
              type="datetime-local"
              name="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="bg-blue-900 mt-1 block w-full rounded-md shadow-darker border-b-2 border-white outline-none"
              style={{ boxShadow: "5px 5px 10px rgba(0,0,0,0.3)" }}
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-lg font-medium text-white"
            >
              Description:
            </label>
            <input
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="text=lg bg-blue-900 mt-1 block w-full rounded-md shadow-darker border-b-2 border-white outline-none"
              style={{ boxShadow: "5px 5px 10px rgba(0,0,0,0.3)" }}
            />
          </div>

          <div>
            <label
              htmlFor="priority"
              className="block text-lg font-medium text-white"
            >
              Priority:
            </label>
            <select
              id="priority"
              name="priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="text-lg bg-blue-900 mt-1 block w-full rounded-md border-b-2 border-white outline-none"
              style={{ boxShadow: "5px 5px 10px rgba(0,0,0,0.3)" }}
            >
              {priorityOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.value}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label
              htmlFor="Task List"
              className="block text-lg font-medium text-white"
            >
              Add as a subtask:
            </label>
            <select
              id="Task List"
              name="Task List"
              value={tasks.id}
              onChange={(e) => setParentTaskId(e.target.value)}
              className="text-lg bg-blue-900 mt-1 block w-full rounded-md border-b-2 border-white outline-none"
              style={{ boxShadow: "5px 5px 10px rgba(0,0,0,0.3)" }}
            >
              <option>Not a subtask</option>
              {topLevelTasks.map((task) => (
                <option key={task.id} value={task.id}>
                  {task.title}
                </option>
              ))}
            </select>
          </div>

          <button
            className="bg-white text-black font-bold py-2 px-4 rounded"
            style={{ boxShadow: "5px 5px 10px rgba(0,0,0,0.3)" }}
            type="submit"
          >
            Submit
          </button>
        </form>
      </main>
    </div>
  );
};
export default AddTask;
