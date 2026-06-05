# Todo Task Management App

A full-stack Todo task management web application built for assessment purposes.

The system consists of:

- **Backend API**: Laravel 11
- **Frontend UI**: React + Vite
- **Styling**: Tailwind CSS
- **Database**: PostgreSQL
- **CI**: GitHub Actions
- **Containerization**: Docker / Docker Compose

## Project Overview

This application allows users to:

- create tasks with a title and description
- view incomplete tasks with pagination (latest tasks shown first)
- edit existing tasks
- mark tasks as completed
- delete tasks permanently

The project is split into two main applications:

- `backend/` — Laravel REST API
- `frontend/` — React SPA

## Prerequisites
Before running the project locally, make sure you have:

- PHP 8.4+
- Composer
- Node.js 20+ (or newer)
- npm
- PostgreSQL
- Git

If Docker is used later, Docker Desktop and Docker Compose will also be required.

## Clone the Repository

```bash
git clone <repository-url>
cd todo-app
```

Replace `<repository-url>` with the actual repository URL.

## Environment Setup

### Backend Configuration

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create a `.env` file from the example:
   ```bash
   cp .env.example .env
   ```

3. Generate the application key:
   ```bash
   php artisan key:generate
   ```

For local development (non-Docker), update `DB_HOST` in `.env` to your local PostgreSQL host (typically `127.0.0.1`).

For Docker, the `.env` file is automatically generated with Docker-friendly configuration.

## Local Development Setup

### Backend
See `backend/README.md` for Laravel setup instructions.

### Frontend
See `frontend/README.md` for React + Vite setup instructions.

## Running the Application Locally
You will run the backend and frontend separately during development.

### Backend

```
cd backend
php artisan serve
```

### Frontend

```
cd frontend
npm run dev
```
The frontend reads the backend API URL from the `VITE_API_URL` environment variable.

## Testing

### Backend tests

```
cd backend
php artisan test
```

### Frontend tests

```
cd frontend
npm run test
```

### Frontend build check

```
cd frontend
npm run build
```

## API Overview
The Laravel backend exposes RESTful JSON endpoints for task management.

Main endpoints:

- `GET /api/tasks`
- `POST /api/tasks`
- `PUT /api/tasks/{task}`
- `PATCH /api/tasks/{task}/complete`
- `DELETE /api/tasks/{task}`

## Environment Variables

### Backend
Key variables are defined in `backend/.env.example`.

### Frontend
Key variables are defined in `frontend/.env.example`.

Important frontend variable:

```
VITE_API_URL=http://127.0.0.1:8000
```

## GitHub Actions CI
The repository uses GitHub Actions for automated checks on push and pull request events.

Current checks include:

- backend code style check
- backend tests
- frontend build check
- frontend tests

## Docker
This project can be started with Docker Compose for complete application deployment.

### Single Command Startup

Start the entire application stack (database, API, frontend) with a single command:

```bash
docker compose up --build
```

The application will be available at:
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:8000
- **Database**: localhost:5432

> **Note on `.env` file**: The `.env` file is automatically generated from `.env.example` during the Docker build process. The `.env` file is not committed to the repository for security reasons. Docker is configured with secure, service-friendly defaults (e.g., `DB_HOST=db` for the database service name).

### Run Tests in Docker

Backend tests:
```bash
docker compose exec api php artisan test
```

Frontend tests:
```bash
docker compose exec frontend npm run test
```

### Stop the Application

```bash
docker compose down
```

## Notes

- The backend uses a singular table name: `task`
- All incomplete tasks are fetched from the database; the frontend displays the latest 5 in a "Recent Tasks" section
- Completed tasks are removed from the visible task list
- Deleted tasks are permanently removed from the database
- The frontend is a single-page application (SPA)
- The `.env` file is required but intentionally excluded from version control for security