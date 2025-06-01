import express from "express";
import cors from "cors";

const app = express();
const PORT = 3000;

// In-memory array to hold notes
let items = [];

// Variables for generating unique ID
let exists = true;
let id;

app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Middleware to parse JSON request bodies

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// GET /notes → Return all existing notes
app.get("/notes", (req, res) => {
  try {
    res.status(200).json(items); // Respond with the current list of notes
  } catch (error) {
    console.error("Error fetching notes:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

// POST /notes → Add a new note or replace the entire notes array
app.post("/notes", (req, res) => {
  try {
    const { text, notes } = req.body; // Destructure text and notes from request body

    // If `notes` array is provided, replace the current items (used to simulate deletion)
    if (notes) {
      items = notes;
      return res.status(200).json(items); // Return the updated list
    }

    // If `notes` and `text` is not provided, return an error
    if (!text) {
      return res.status(400).json({ error: "text is required" });
    }

    // Generate a unique ID by combining timestamp and random number
    while (exists) {
      id = Date.now() + Math.floor(Math.random() * 1000);
      exists = items.some((item) => item.id === id); // Ensure ID is unique
    }
    exists = true; // Reset for next ID generation

    // Add the new note to the array
    items.push({ id, text });

    // Respond with the newly created note
    res.status(201).json({ id, text });
  } catch (error) {
    console.error("Error adding note:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
