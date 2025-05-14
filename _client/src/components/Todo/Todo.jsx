import React, { useState, useEffect } from "react";
import "./Todo.css";
import Table from "./Table";
import Message from "./Message";
import { Modal, Box, Typography, TextField, Button } from "@mui/material";
import Inputbox from "./Inputbox";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "10px",
  border: "none",
  outline: "none",
};

function Todo() {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [open, setOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null); // ✅ for editing
  const [filterDate, setFilterDate] = useState("");
  const [appliedFilter, setAppliedFilter] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/todos")
      .then((response) => {
        setTasks(response.data);
      })
      .catch((error) => console.error("Error fetching tasks:", error));
  }, []);

  const handleOpen = () => {
    setEditingTask(null); // ✅ ensure we’re not editing
    setOpen(true);
  };

  const handleClose = () => setOpen(false);
  const handleFilterOpen = () => setFilterOpen(true);
  const handleFilterClose = () => setFilterOpen(false);

  const handleSaveTask = (taskData) => {
    const newTask = { ...taskData };

    axios
      .post("http://localhost:4000/api/todos", newTask)
      .then((response) => {
        setTasks([response.data, ...tasks]);
        handleClose();
      })
      .catch((error) => console.error("Error adding task:", error));
  };

  const handleUpdateTask = (updatedData) => {
    // ✅ Update existing task on backend
    axios
      .put(`http://localhost:4000/api/todos/${updatedData._id}`, updatedData)
      .then((response) => {
        setTasks((prev) =>
          prev.map((task) =>
            task._id === updatedData._id ? response.data : task
          )
        );
        setEditingTask(null); // ✅ clear editing state
        handleClose();
      })
      .catch((error) => console.error("Error updating task:", error));
  };

  const handleEditTask = (task) => {
    // ✅ Triggered when Edit button is clicked
    setEditingTask(task);
    setOpen(true);
  };

  const handleDeleteTask = (id) => {
    axios
      .delete(`http://localhost:4000/api/todos/${id}`)
      .then(() => {
        setTasks(tasks.filter((task) => task._id !== id));
      })
      .catch((error) => console.error("Error deleting task:", error));
  };

  const handleToggleComplete = (id) => {
    const task = tasks.find((task) => task._id === id);
    const updatedTask = { ...task, completed: !task.completed };
    axios
      .put(`http://localhost:4000/api/todos/${id}`, updatedTask)
      .then((response) => {
        const updatedTasks = tasks.map((task) =>
          task._id === id ? response.data : task
        );
        setTasks(updatedTasks);
      })
      .catch((error) => console.error("Error toggling task completion:", error));
  };

  const applyFilter = () => {
    setAppliedFilter(filterDate);
    handleFilterClose();
  };

  const clearFilter = () => {
    setFilterDate("");
    setAppliedFilter("");
  };

  const handleLogout = () => {
    sessionStorage.removeItem("loggedInUser");
    navigate("/");
  };

  const filteredTasks = appliedFilter
    ? tasks.filter((task) => task.eventDate === appliedFilter)
    : tasks;

  return (
    <>
      <div className="cotnainer">
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
        <div className="todo-box">
          <h2>React To-Do List</h2>
          <div className="btn-contianer">
            <div className="btn-pos">
              <button className="btn-1" onClick={handleOpen}>
                Add a new To-Do
              </button>
              <button className="btn-2" onClick={handleFilterOpen}>
                Filter
              </button>
            </div>
            <div className="text">
              <button className="btn-3">{Message()}</button>
            </div>
          </div>
          <Table
            tasks={filteredTasks}
            onDelete={handleDeleteTask}
            onToggleComplete={handleToggleComplete}
            onEdit={handleEditTask} // ✅ NEW PROP
          />
        </div>
      </div>

      {/* Add/Edit Modal */}
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Typography variant="h6">
            {editingTask ? "Edit Task" : "Add a New Task"}
          </Typography>
          <Inputbox
            handleClose={handleClose}
            handleSave={editingTask ? handleUpdateTask : handleSaveTask} // ✅ Add/Edit mode
            editingTask={editingTask} // ✅ NEW PROP
          />
        </Box>
      </Modal>

      {/* Filter Modal */}
      <Modal open={filterOpen} onClose={handleFilterClose}>
        <Box sx={style}>
          <Typography variant="h6">Filter Tasks by Date</Typography>
          <TextField
            type="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            fullWidth
            sx={{ my: 2 }}
          />
          <Button
            onClick={applyFilter}
            variant="contained"
            sx={{ mr: 2, borderRadius: "12px" }}
          >
            Apply Filter
          </Button>
          <Button
            onClick={clearFilter}
            variant="outlined"
            sx={{ borderRadius: "12px" }}
          >
            Clear Filter
          </Button>
        </Box>
      </Modal>
    </>
  );
}

export default Todo;
