const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const todoRoutes = require("./routes/todoRoutes");
const authRoutes = require('./routes/authRoutes');

dotenv.config();

const app = express();

connectDB();

app.use(express.json());

// Routes
app.use("/api/todos", todoRoutes);
app.use("/api/auth" , authRoutes);

app.get("/", (req, res) => {
  res.send("Hello from Express!");
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
