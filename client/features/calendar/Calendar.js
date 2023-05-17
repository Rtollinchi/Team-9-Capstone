import React, { useEffect, useState } from "react";
import Fullcalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useDispatch, useSelector } from "react-redux";
import { selectTasks, fetchTasks, updateTask } from "../slices/TaskSlice";
import Modal from "react-modal";

const Calendar = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const tasks = useSelector(selectTasks);
  const [selectedTask, setSelectedTask] = useState(null);

  let calendarEvents = tasks.map((task) => {
    let color;
    switch (task.priority) {
      case "Low":
        color = "green";
        break;
      case "Medium":
        color = "yellow";
        break;
      case "High":
        color = "red";
        break;
      default:
        color = "white"; // Default color if no match
    }

    return {
      title: task.title,
      date: task.dueDate,
      backgroundColor: color,
      extendedProps: { ...task },
    };
  });

  const handleEventClick = (info) => {
    const { event } = info;
    setSelectedTask(event.extendedProps);
  };

  const closeModal = () => {
    setSelectedTask(null);

    const calendarEvents = tasks.map((task) => {
      return { id: task.id, title: task.title, date: task.dueDate };
    });

    const handleEventDrop = async (eventDropInfo) => {
      const event = eventDropInfo.event;

      const { id, start } = event;

      const updatedTask = {
        id: id,
        dueDate: start.toISOString(),
      };

      await dispatch(updateTask(updatedTask));
    };

    return (
      <div className="flex flex-col items-center justify-center h-screen overflow-auto p-6 mt-5 w-3/4 max-h-81 mx-auto rounded-md shadow-darker bg-blue-900 text-white">
        <div className="grid grid-flow-col justify-around w-full h-full">
          <div>
            <Fullcalendar
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              initialView={"dayGridMonth"}
              headerToolbar={{
                start: "today prev,next",
                center: "title",
                end: "dayGridMonth,timeGridWeek,timeGridDay",
              }}
              height={"auto"}
              events={calendarEvents}
              selectable={true}
              editable={true}
              droppable={true}
              eventDrop={handleEventDrop}
              slotLabelFormat={[
                { hour: "numeric", minute: "2-digit", hour12: true },
              ]}
              eventClick={handleEventClick}
            />
          </div>
        </div>

        {selectedTask && (
          <Modal
            isOpen={true}
            onRequestClose={closeModal}
            style={{
              content: {
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                background: "white",
                padding: "2rem",
                borderRadius: "0.5rem",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.25)",
                width: "400px", // Adjust the width as needed
              },
              overlay: {
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                zIndex: 9999, // Set a higher value than the calendar's zIndex
              },
            }}
            contentLabel="Task Details"
            overlayClassName="modal-overlay" // Add a custom class name for the overlay
          >
            <h2 className="text-lg font-bold mb-4">{selectedTask.title}</h2>
            <p className="text-gray-600">{selectedTask.description}</p>
            <p className="text-gray-600 mt-2">
              Priority: {selectedTask.priority}
            </p>
            <p className="text-gray-600 mt-2">
              Due Date: {selectedTask.dueDate}
            </p>
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 mt-4 rounded"
              onClick={closeModal}
            >
              Close
            </button>
          </Modal>
        )}
      </div>
    );
  };
};
export default Calendar;
