# Todo Backend API

This is the Laravel 11 backend for the Todo Task Management App.

It provides a RESTful JSON API for task management.

## Features

- Create a task
- View the latest 5 incomplete tasks
- Update a task
- Mark a task as completed
- Delete a task permanently
- Validation using Form Requests
- JSON responses with status codes
- Feature and database tests

## Prerequisites

Make sure you have installed:

- PHP 8.2+
- Composer
- PostgreSQL
- Git

## Setup

### 1. Install dependencies

```bash
composer install
```

### 2. Copy the environment file
On Windows Command Prompt:

```
copy .env.example .env
```
On PowerShell:

```
Copy-Item .env.example .env
```

### 3. Generate the application key

```
php artisan key:generate
```

### 4. Configure the database
Update your `.env` file with your PostgreSQL credentials.

Example:

```
DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=todo_app_db
DB_USERNAME=todo_user
DB_PASSWORD=todo_pass_123
```

### 5. Run migrations

```
php artisan migrate
```

### 6. Seed the database (optional)

```
php artisan db:seed
```

## Running the Backend
Start the Laravel development server:

```
php artisan serve
```
The backend will usually be available at:

```
http://127.0.0.1:8000
```

## API Endpoints

### Get tasks

```
GET /api/tasks
```

### Create task

```
POST /api/tasks
```

### Update task

```
PUT /api/tasks/{task}
```

### Mark task as completed

```
PATCH /api/tasks/{task}/complete
```

### Delete task

```
DELETE /api/tasks/{task}
```

## Testing
Run the backend test suite:

```
php artisan test
```
This includes:

- database tests
- feature tests
- API tests

## Code Quality
This project uses Laravel Pint for code style checks.

Run Pint:

```
./vendor/bin/pint --test
```

## Environment Variables
Important backend values are defined in `.env.example`.

Typical values include:

```
APP_NAME=TodoApp
APP_ENV=local
APP_DEBUG=true
APP_URL=http://localhost:8000

DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=todo_app_db
DB_USERNAME=todo_user
DB_PASSWORD=todo_pass_123
```

## Notes

- The database table name is `task`
- Deleted tasks are permanently removed
- Only incomplete tasks are returned in the list endpoint
- Only the 5 most recent incomplete tasks are shown
