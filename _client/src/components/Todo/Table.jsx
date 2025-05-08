import React, { useState, useEffect } from "react";
import "./table.css";
import CustomPagination from "./Pagination";

function Table({ tasks, onDelete, onToggleComplete }) {
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 4;
  const [hoveredTaskId, setHoveredTaskId] = useState(null);
  const [countdown, setCountdown] = useState("");

  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask);

  // Countdown timer logic
  useEffect(() => {
    let countdownInterval;

    if (hoveredTaskId !== null) {
      countdownInterval = setInterval(() => {
        const task = tasks.find((t) => t._id === hoveredTaskId);
        if (!task || !task.eventDate || !task.eventTime) {
          setCountdown("Invalid time");
          return;
        }

        const taskTime = new Date(`${task.eventDate}T${task.eventTime}`);
        const now = new Date();
        const diff = taskTime - now;

        if (diff > 0) {
          const hours = Math.floor(diff / (1000 * 60 * 60));
          const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
          setCountdown(`${hours}h ${minutes}m`);
        } else {
          setCountdown("Time expired");
        }
      }, 1000);
    }

    return () => clearInterval(countdownInterval);
  }, [hoveredTaskId, tasks]);

  return (
    <div className="table-container">
      <table className="table">
        <thead>
          <tr>
            <th className="task">Task</th>
            <th className="desc">Description</th>
            <th className="date">Date</th>
            <th className="time">Time</th>
            <th className="actions">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.length === 0 ? (
            <tr>
              <td colSpan="5" className="empty-text">No tasks added</td>
            </tr>
          ) : (
            currentTasks.map((task) => (
              <tr
                key={task._id}
                onClick={() => onToggleComplete(task._id)}
                className={task.completed ? "completed-task" : ""}
              >
                <td className="task">{task.task}</td>
                <td className="desc">{task.description}</td>
                <td className="date">{task.eventDate}</td>
                <td
                  className="time tooltip-container"
                  onMouseEnter={() => setHoveredTaskId(task._id)}
                  onMouseLeave={() => {
                    setHoveredTaskId(null);
                    setCountdown("");
                  }}
                >
                  {task.eventTime}
                  {hoveredTaskId === task._id && (
                    <span className="tooltip">{countdown || "Calculating..."}</span>
                  )}
                </td>
                <td className="actions">
                <button className="btn-b" onClick={(e) => { e.stopPropagation(); onEdit(index); }}>
                    &#9998;
                  </button>
                  <button
                    className="btn-r"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(task._id);
                    }}
                  >
                    &#128465;
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <div className="page-stick">
        <CustomPagination
          tasksPerPage={tasksPerPage}
          totalTasks={tasks.length}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
}

export default Table;
