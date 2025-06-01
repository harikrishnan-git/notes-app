# Notes App

A simple notes application built with Node.js (Express) backend and React frontend. You can add and delete notes from the UI.

---

## Features

- Add new notes
- View existing notes
- Delete notes locally in the frontend UI

---

## Backend

- Single `server.js` file
- In-memory notes store (array)
- Two API endpoints only:
  - `GET /notes` - returns all notes
  - `POST /notes` - adds a new note `{ text: string }`

---

## Frontend

- React app (Vite-based)
- Displays notes fetched from backend
- Allows adding new notes (POST to backend)
- Shows a delete button next to each note (deletes note from UI only)

---

## Important Note on Delete Functionality

Due to assignment constraints allowing **only GET and POST endpoints on the backend**, the delete button removes notes **only from the frontend state** and does **not** delete notes from the backend server. Deleting notes server-side would require a DELETE or PUT endpoint, which is beyond the current spec.

---

## Setup & Run

1. Clone the repo:

```bash
git clone https://github.com/yourusername/notes-app.git
cd notes-app
```

2. Install dependencies:

```bash
npm install concurrently
npm run setup
```

3. Run:

```bash
npm start
```
