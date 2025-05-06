import React, { useState } from "react";
import "./Todo.css";
import Table from "./Table";
import Message from "./Message";
import { Modal, Box, Typography, TextField, Button } from "@mui/material";
import Inputbox from "./Inputbox";
import { useNavigate } from "react-router-dom";

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
  const loggedInUser = sessionStorage.getItem("loggedInUser");

  const storedTasks = JSON.parse(localStorage.getItem("todos")) || [];
  const userTasks = storedTasks.filter((task) => task.email === loggedInUser);

  const [tasks, setTasks] = useState(userTasks);
  const [open, setOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [filterDate, setFilterDate] = useState("");
  const [appliedFilter, setAppliedFilter] = useState("");

  const saveTasksToStorage = (updatedTasks) => {
    const newTaskList = [
      ...storedTasks.filter((task) => task.email !== loggedInUser),
      ...updatedTasks,
    ];
    localStorage.setItem("todos", JSON.stringify(newTaskList));
    setTasks(updatedTasks);
  };

  const handleOpen = () => {
    setEditingTask(null);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  const handleFilterOpen = () => setFilterOpen(true);
  const handleFilterClose = () => setFilterOpen(false);

  const handleSaveTask = (taskData) => {
    const updatedTask = { ...taskData, email: loggedInUser, completed: false };
    const updatedTasks =
      editingTask !== null
        ? tasks.map((task, index) =>
            index === editingTask ? updatedTask : task
          )
        : [updatedTask, ...tasks];

    saveTasksToStorage(updatedTasks);
    handleClose();
  };

  const handleDeleteTask = (index) => {
    saveTasksToStorage(tasks.filter((_, i) => i !== index));
  };

  const handleEditTask = (index) => {
    setEditingTask(index);
    setOpen(true);
  };

  const handleToggleComplete = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    saveTasksToStorage(updatedTasks);
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
    ? tasks.filter((task) => task.date === appliedFilter)
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
            onEdit={handleEditTask}
            onToggleComplete={handleToggleComplete}
          />
        </div>
      </div>

      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Typography variant="h6">
            {editingTask !== null ? "Edit Task" : "Add a New Task"}
          </Typography>
          <Inputbox
            handleClose={handleClose}
            handleSave={handleSaveTask}
            taskToEdit={tasks[editingTask]}
          />
        </Box>
      </Modal>

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
