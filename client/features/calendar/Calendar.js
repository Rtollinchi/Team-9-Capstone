import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { selectTasks, fetchTasks, updateTask } from '../slices/TaskSlice';

const Calendar = () => {
  const dispatch = useDispatch();
  const tasks = useSelector(selectTasks);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

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
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          headerToolbar={{
            start: 'today prev,next',
            center: 'title',
            end: 'dayGridMonth,timeGridWeek,timeGridDay',
          }}
          height="auto"
          events={calendarEvents}
          selectable={true}
          editable={true}
          droppable={true}
          eventDrop={handleEventDrop}
        />
      </div>
    </div>
  );
};

export default Calendar;
