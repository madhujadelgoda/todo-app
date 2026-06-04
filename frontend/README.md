# Todo Frontend UI

This is the React + Vite frontend for the Todo Task Management App.

It is a single-page application (SPA) that communicates with the Laravel backend API.

## Features

- Create task form
- Edit task form
- Task cards
- Done action
- Delete action
- Displays only the 5 latest incomplete tasks
- Toast messages
- Loading and error states
- Component tests with Vitest and React Testing Library

## Prerequisites

Make sure you have installed:

- Node.js 20+
- npm
- Git

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Create the local environment file
On Windows Command Prompt:

```
copy .env.example .env.local
```
On PowerShell:

```
Copy-Item .env.example .env.local
```

### 3. Configure the API URL
Open `.env.local` and set the backend URL.

Example:

```
VITE_API_URL=http://127.0.0.1:8000
```

## Running the Frontend
Start the development server:

```
npm run dev
```
The frontend will usually be available at:

```
http://localhost:5173
```

## Build
Create a production build:

```
npm run build
```
Preview the production build:

```
npm run preview
```

## Testing
Run the frontend test suite:

```
npm run test
```
If Vitest opens watch mode and you want a single run, use:

```
npm run test -- --run
```

## Code Quality
Run ESLint:

```
npm run lint
```

## Environment Variables
The frontend uses Vite environment variables.

Important variable:

```
VITE_API_URL=http://127.0.0.1:8000
```

## Notes

- The frontend is styled with Tailwind CSS
- The app reads task data from the Laravel API
- Task list updates automatically after CRUD actions
- Completed tasks are removed from the visible list
