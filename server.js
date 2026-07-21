const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./openapi.json");
const Database = require("better-sqlite3");

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// Swagger UI
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

/* ==========================
   SQLite Database
========================== */

const db = new Database("tasks.db");

// Create table if it doesn't exist
db.prepare(`
CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    done INTEGER NOT NULL DEFAULT 0
)
`).run();

// Seed database only once
const count = db.prepare("SELECT COUNT(*) AS count FROM tasks").get();

if (count.count === 0) {
    const insert = db.prepare(
        "INSERT INTO tasks (title, done) VALUES (?, ?)"
    );

    insert.run("Learn Express", 0);
    insert.run("Build CRUD API", 0);
    insert.run("Complete Assignment", 1);
}

/* ==========================
   Home Route
========================== */

app.get("/", (req, res) => {
    res.json({
        name: "Task API",
        version: "1.0",
        endpoints: [
            "/tasks",
            "/health",
            "/docs"
        ]
    });
});

/* ==========================
   Health Check
========================== */

app.get("/health", (req, res) => {
    res.json({
        status: "OK",
        message: "Server is running"
    });
});

/* ==========================
   GET ALL TASKS
========================== */

app.get("/tasks", (req, res) => {

    const rows = db.prepare(`
        SELECT id, title, done
        FROM tasks
    `).all();

    const tasks = rows.map(task => ({
        id: task.id,
        title: task.title,
        done: Boolean(task.done)
    }));

    res.status(200).json(tasks);

});

/* ==========================
   GET TASK BY ID
========================== */

app.get("/tasks/:id", (req, res) => {

    const id = Number(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({
            error: "Invalid task ID"
        });
    }

    const task = db.prepare(`
        SELECT id, title, done
        FROM tasks
        WHERE id = ?
    `).get(id);

    if (!task) {
        return res.status(404).json({
            error: "Task not found"
        });
    }

    task.done = Boolean(task.done);

    res.status(200).json(task);

});

/* ==========================
   CREATE TASK
========================== */

app.post("/tasks", (req, res) => {

    const { title, done } = req.body;

    if (!title || title.trim() === "") {
        return res.status(400).json({
            error: "Title is required"
        });
    }

    const result = db.prepare(`
        INSERT INTO tasks (title, done)
        VALUES (?, ?)
    `).run(
        title.trim(),
        done ? 1 : 0
    );

    const newTask = db.prepare(`
        SELECT id, title, done
        FROM tasks
        WHERE id = ?
    `).get(result.lastInsertRowid);

    newTask.done = Boolean(newTask.done);

    res.status(201).json(newTask);

});

/* ==========================
   UPDATE TASK
========================== */

app.put("/tasks/:id", (req, res) => {

    const id = Number(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({
            error: "Invalid task ID"
        });
    }

    const { title, done } = req.body;

    if (!title || title.trim() === "") {
        return res.status(400).json({
            error: "Title is required"
        });
    }

    const existingTask = db.prepare(`
        SELECT id
        FROM tasks
        WHERE id = ?
    `).get(id);

    if (!existingTask) {
        return res.status(404).json({
            error: "Task not found"
        });
    }

    db.prepare(`
        UPDATE tasks
        SET title = ?, done = ?
        WHERE id = ?
    `).run(
        title.trim(),
        done ? 1 : 0,
        id
    );

    const updatedTask = db.prepare(`
        SELECT id, title, done
        FROM tasks
        WHERE id = ?
    `).get(id);

    updatedTask.done = Boolean(updatedTask.done);

    res.status(200).json(updatedTask);

});

/* ==========================
   DELETE TASK
========================== */

app.delete("/tasks/:id", (req, res) => {

    const id = Number(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({
            error: "Invalid task ID"
        });
    }

    const result = db.prepare(`
        DELETE FROM tasks
        WHERE id = ?
    `).run(id);

    if (result.changes === 0) {
        return res.status(404).json({
            error: "Task not found"
        });
    }

    res.status(204).send();

});

/* ==========================
   Start Server
========================== */

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});