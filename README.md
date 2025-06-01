# Notes App

A simple notes application built with Node.js (Express) backend and React frontend. You can add and delete notes from the UI.

---

# Approach

The backend uses a minimal setup with Express and an in-memory array to store notes, avoiding the need for a database. Only two endpoints are used as per the requirement. Instead of a DELETE route, deletion is achieved by sending a filtered array of notes back via the POST /notes route. The frontend uses Vite and communicates with the backend using Axios, managing all notes through React state and providing user-friendly feedback using react-hot-toast.

---

## Features

- Add new notes
- View existing notes
- Delete existing notes

---

## Backend

- Single `server.js` file
- In-memory notes store (array)
- Two API endpoints only:
  - `GET /notes` - returns all notes
  - `POST /notes` - Serves two functionalities:
    - `Add a new note`: Pass `{text: string}` in the request body to create and store a new note.
    - `Delete a note`: Pass `notes: Note[]` with the updated array (excluding the deleted note). This replaces the internal store with the provided array.

---

## Frontend

- React app (Vite-based)
- Displays notes fetched from backend
- Allows adding new notes (POST to backend)
- Shows a delete button next to each note for deletion

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
