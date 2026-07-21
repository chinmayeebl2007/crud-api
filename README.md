# Task API

A simple RESTful CRUD API built using **Node.js** and **Express.js**. This project demonstrates the basic Create, Read, Update, and Delete (CRUD) operations using an in-memory array. The API also includes interactive documentation using **Swagger UI**.

---

## Features

- Create a new task
- View all tasks
- View a task by ID
- Update an existing task
- Delete a task
- Health check endpoint
- Interactive Swagger UI documentation

---

## Technologies Used

- Node.js
- Express.js
- Swagger UI Express
- OpenAPI 3.0 (openapi.json)

---

## Installation

Clone the repository:

```bash
git clone https://github.com/chinmayeebl2007/crud-api.git
```

Go to the project folder:

```bash
cd crud-api
```

Install dependencies:

```bash
npm install
```

---

## Run the Project

Start the server using:

```bash
node server.js
```

The server runs at:

```
http://localhost:3000
```

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | / | API information |
| GET | /health | Health check |
| GET | /tasks | Get all tasks |
| GET | /tasks/:id | Get task by ID |
| POST | /tasks | Create a new task |
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

## Example curl Command

```bash
curl -i -X POST http://localhost:3000/tasks ^
-H "Content-Type: application/json" ^
-d "{\"title\":\"Buy milk\"}"
```

### Example Response

```http
HTTP/1.1 201 Created
Content-Type: application/json; charset=utf-8

{
  "id": 4,
  "title": "Buy milk",
  "done": false
}
```

---

## Swagger Documentation

Open the following URL in your browser:

```
http://localhost:3000/docs
```

### Swagger UI

> Replace the filename below if you want to use a different screenshot.

```md
![Swagger UI](screenshots/Screenshot%20(1048).png)
```

After saving the README, remove the surrounding triple backticks from the image line so it becomes:

![Swagger UI](screenshots/Screenshot%20(1048).png)

---

## Status Codes

| Status Code | Meaning |
|-------------|---------|
| 200 | OK |
| 201 | Created |
| 204 | No Content |
| 400 | Bad Request |
| 404 | Not Found |

---

## Author

**Chinmayee B L**