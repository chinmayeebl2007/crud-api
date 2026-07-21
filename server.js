const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./openapi.json");

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// Swagger UI
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// In-memory task list
let tasks = [
    { id: 1, title: "Learn Express", done: false },
    { id: 2, title: "Build CRUD API", done: false },
    { id: 3, title: "Complete Assignment", done: true }
];

// Home Route
app.get("/", (req, res) => {
    res.json({
        message: "Welcome to the Task API!"
    });
});

// Health Check
app.get("/health", (req, res) => {
    res.json({
        status: "OK",
        message: "Server is running"
    });
});

// Get all tasks
app.get("/tasks", (req, res) => {
    res.status(200).json(tasks);
});

// Get task by ID
app.get("/tasks/:id", (req, res) => {

    const id = Number(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({
            error: "Invalid task ID"
        });
    }

    const task = tasks.find(task => task.id === id);

    if (!task) {
        return res.status(404).json({
            error: "Task not found"
        });
    }

    res.status(200).json(task);
});

// Create task
app.post("/tasks", (req, res) => {

    const { title, done } = req.body;

    if (!title || title.trim() === "") {
        return res.status(400).json({
            error: "Title is required"
        });
    }

    const newTask = {
        id: tasks.length ? tasks[tasks.length - 1].id + 1 : 1,
        title: title.trim(),
        done: done ?? false
    };

    tasks.push(newTask);

    res.status(201).json(newTask);
});

// Update task
app.put("/tasks/:id", (req, res) => {

    const id = Number(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({
            error: "Invalid task ID"
        });
    }

    const task = tasks.find(task => task.id === id);

    if (!task) {
        return res.status(404).json({
            error: "Task not found"
        });
    }

    const { title, done } = req.body;

    if (!title || title.trim() === "") {
        return res.status(400).json({
            error: "Title is required"
        });
    }

    task.title = title.trim();
    task.done = done ?? task.done;

    res.status(200).json(task);
});

// Delete task
app.delete("/tasks/:id", (req, res) => {

    const id = Number(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({
            error: "Invalid task ID"
        });
    }

    const index = tasks.findIndex(task => task.id === id);

    if (index === -1) {
        return res.status(404).json({
            error: "Task not found"
        });
    }

    tasks.splice(index, 1);

    res.status(204).send();
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});