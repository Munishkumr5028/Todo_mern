const Todo = require("../models/todoModels");

// Create a new todo
exports.createTodo = async (req, res) => {
  try {
    const { task, description, eventDate, eventTime } = req.body;
    const newTodo = await Todo.create({
      task,
      description,
      eventDate,
      eventTime,
    });
    res.status(201).json(newTodo);
  } catch (err) {
    res.status(500).json({ error: "Failed to create todo" });
  }
};

// Get all todos
exports.getTodos = async (req, res) => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 });
    res.status(200).json(todos);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch todos" });
  }
};

// Get a todo by ID (for editing)
exports.getTodoById = async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findById(id);
    if (!todo) {
      return res.status(404).json({ error: "Todo not found" });
    }
    res.status(200).json(todo);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch todo" });
  }
};

// Update a todo
exports.updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { task, description, eventDate, eventTime } = req.body;

    // Check if task exists
    const todo = await Todo.findById(id);
    if (!todo) {
      return res.status(404).json({ error: "Todo not found" });
    }

    // Update the task
    todo.task = task || todo.task;
    todo.description = description || todo.description;
    todo.eventDate = eventDate || todo.eventDate;
    todo.eventTime = eventTime || todo.eventTime;

    const updatedTodo = await todo.save();
    res.status(200).json(updatedTodo);
  } catch (err) {
    res.status(500).json({ error: "Failed to update todo" });
  }
};

// Delete a todo
exports.deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTodo = await Todo.findByIdAndDelete(id);
    if (!deletedTodo) {
      return res.status(404).json({ error: "Todo not found" });
    }
    res.status(200).json({ message: "Todo deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete todo" });
  }
};
