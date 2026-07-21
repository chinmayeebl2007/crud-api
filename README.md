# Task API

A simple RESTful CRUD API built using **Node.js** and **Express.js**. This project demonstrates the basic Create, Read, Update, and Delete (CRUD) operations using an in-memory array.

---

## Features

- Create a new task
- View all tasks
- View a task by ID
- Update an existing task
- Delete a task
- Health check endpoint
- Swagger API documentation

---

## Technologies Used

- Node.js
- Express.js
- Swagger UI Express
- Swagger JSDoc

---

## Installation

Clone the repository:

```bash
git clone <your-github-repository-url>
```

Go to the project folder:

```bash
cd crud-api
```

Install dependencies:

```bash
npm install
```

Start the server:

```bash
node server.js
```

The server runs on:

```
http://localhost:3000
```

---

## API Endpoints

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | / | Welcome message |
| GET | /health | Health check |
| GET | /tasks | Get all tasks |
| GET | /tasks/:id | Get task by ID |
| POST | /tasks | Create a task |
| PUT | /tasks/:id | Update a task |
| DELETE | /tasks/:id | Delete a task |

---

## Example Task Object

```json
{
    "id": 1,
    "title": "Learn Express",
    "done": false
}
```

---

## Swagger Documentation

Open:

```
http://localhost:3000/docs
```

---

## Status Codes

- 200 OK
- 201 Created
- 204 No Content
- 400 Bad Request
- 404 Not Found

---

## Author

**Chinmayee B L**