# Task Management Board

## Overview
Task Management Board is a full-stack Kanban-style app for organising work in three statuses (To Do, In Progress, Done). The frontend is a Vite + React + Tailwind SPA served by Nginx, while the backend is an Express API backed by PostgreSQL and Sequelize ORM. Everything runs via Docker Compose.

## Project structure
```
.
├── docker-compose.yml          # Orchestrates Postgres, backend, and frontend containers
├── .env                        # Postgres credentials consumed by docker compose
├── client/                     # React application (Vite, Tailwind)
│   ├── Dockerfile              # Builds static assets and serves them through Nginx
│   ├── nginx.conf              # Custom Nginx config for SPA routing
│   └── src/
│       ├── api/useTasks.js     # Axios hooks for CRUD calls
│       ├── components/         # Board, Column, TaskCard, TaskModal, etc.
│       └── pages/              # Home page with board layout
├── server/                     # Express + Sequelize API
│   ├── Dockerfile
│   ├── entrypoint.sh           # Runs migrations and seeders before starting the API
│   ├── app.js                  # Express bootstrap (CORS, routes, error handling)
│   ├── src/tasks/              # Routes, controller, service, repository layers
│   └── db/                     # Sequelize models, migrations, and seeders
```

## Features
- Kanban board with responsive 3-column layout, styled via Tailwind.
- Modal form (`Tambah Tugas`) to add a task (title + optional description).
- Inline status selector to move tasks across columns.
- Delete button on each task card.
- Automatic refetch after every create/update/delete so the board stays in sync.
- Backend validation for missing titles, invalid statuses, and unknown task IDs.

### API endpoints
| Method | Endpoint | Description | Request body |
|--------|----------|-------------|--------------|
| GET    | `/api/tasks`       | Returns all tasks grouped by status. | – |
| POST   | `/api/tasks`       | Creates a new task with default status `"To Do"`. | `{ "title": "My task", "description": "optional" }` |
| PUT    | `/api/tasks/:id`   | Updates the status of a task. | `{ "status": "In Progress" }` (allowed: `To Do`, `In Progress`, `Done`)
| DELETE | `/api/tasks/:id`   | Deletes a task. | – |

Example response from `GET /api/tasks`:
```json
{
  "To Do": [{ "id": "...", "title": "task 1", "status": "To Do" }],
  "In Progress": [{ "id": "...", "title": "task 2", "status": "In Progress" }],
  "Done": [{ "id": "...", "title": "task 3", "status": "Done" }]
}
```

### UI actions
- View the board grouped by status with counts driven directly by the API response.
- Click `Tambah Tugas` to open the modal, fill title/description, and submit to create a task.
- Use the dropdown on each task to move it between columns.
- Use `Hapus` to delete a task.
- Inline loading and error states so users know when data is still being fetched.

## Environment variables
Copy each example file to its real counterpart before running the stack.

**Root `.env`** (used by the `postgres` service):
| Name | Description | Example |
|------|-------------|---------|
| `POSTGRES_DB` | Database name created inside the container. | `task-mgmt` |
| `POSTGRES_USER` | Database superuser. | `root` |
| `POSTGRES_PASSWORD` | Password for `POSTGRES_USER`. | `12345678` |
| `POSTGRES_HOST` | Hostname referenced by other services. | `postgres` |
| `POSTGRES_PORT` | Host port exposed for local tools. | `5434` |

**`server/.env`** (Express API + Sequelize):
| Name | Description |
|------|-------------|
| `DB_NAME`, `DB_USER`, `DB_PASS`, `DB_HOST`, `DB_PORT` | Connection settings that mirror the Postgres container.
| `APP_PORT` | Port exposed by the API container (default `3000`). |
| `CLIENT_URL` | Allowed origin for CORS (e.g., `http://localhost:8080`). |

**`client/.env`** (React app):
| Name | Description | Example |
|------|-------------|---------|
| `VITE_API_URL` | Base URL for Axios requests. | `http://localhost:3000/api` |

## Running with Docker Compose
```bash
docker compose up -d --build
```