import express from "express";
import cors from "cors";

const app = express();
const PORT = 3000;
let items = []; // Array to hold notes
let exists = true;
let id;

app.use(cors());
app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Endpoint to get all notes at /notes
app.get("/notes", (req, res) => {
  try {
    res.status(200).json(items); // Return all notes
  } catch (error) {
    console.error("Error fetching notes:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

//Endpoint to add a new note at /notes
app.post("/notes", (req, res) => {
  try {
    const { text } = req.body; // Extract id and text from request body
    // Check if id and text are provided
    if (!text) {
      return res.status(400).json({ error: "text is required" });
    }
    while (exists) {
      id = Date.now() + Math.floor(Math.random() * 1000);
      exists = items.some((item) => item.id === id);
    }
    exists = true;
    items.push({ id, text }); // Add new note
    res.status(201).json({ text }); // Return the added note
  } catch (error) {
    console.error("Error adding note:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
