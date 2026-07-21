# Task API with SQLite

## Project Overview

This project is a RESTful Task Management API built using Node.js, Express.js, and SQLite. It allows users to create, read, update, and delete tasks while storing all data permanently in a SQLite database.

This project demonstrates replacing in-memory storage with a persistent SQLite database using better-sqlite3.

---

## Features

- Create tasks
- View all tasks
- View a task by ID
- Update tasks
- Delete tasks
- SQLite database integration
- Swagger API documentation
- Persistent data storage

---

## Technologies Used

- Node.js
- Express.js
- SQLite
- better-sqlite3
- Swagger UI

---

## Installation

Clone the repository:

```bash
git clone <repository-url>
```

Install dependencies:

```bash
npm install
```

---

## Run the Project

```bash
node server.js
```

Server:

```
http://localhost:3000
```

Swagger Documentation:

```
http://localhost:3000/docs
```

---

## Database

Database file:

```
tasks.db
```

Table:

```
tasks
```

Columns:

| Column | Type |
|---------|------|
| id | INTEGER |
| title | TEXT |
| done | INTEGER |

---

## API Endpoints

### GET /tasks

Returns all tasks.

### GET /tasks/:id

Returns a task by ID.

### POST /tasks

Creates a new task.

Example:

```json
{
  "title": "Learn SQLite",
  "done": false
}
```

---

### PUT /tasks/:id

Updates an existing task.

---

### DELETE /tasks/:id

Deletes a task.

---

## Testing

The API was tested using:

- Postman
- Swagger UI
- DB Browser for SQLite

---

## Future Improvements

- Authentication
- User accounts
- Search functionality
- Pagination
- Due dates
- Task categories

---

## Author

Chinmayee B L