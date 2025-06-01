import { useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast"; // For toast notifications
import { MdDelete } from "react-icons/md"; // Delete icon
import "./App.css";

function App() {
  const baseURL = "http://localhost:3000"; // Base URL for API requests
  let items = []; // Temporary variable for holding updated notes
  const [notes, setNotes] = useState([]); // State to store notes
  const [inputData, setInputData] = useState(""); // State to store input value

  // useEffect runs once on component mount to fetch existing notes
  useEffect(() => {
    const func = async () => {
      axios.get(`${baseURL}/notes`).then((recNotes) => {
        setNotes(recNotes.data); // Set the received notes to state
        console.log(recNotes.data); // Log for debug
      });
    };
    func();
  }, []);

  return (
    <>
      <center>
        <h1 className="heading">📝 Note-Maker</h1>

        {/* Input section */}
        <div className="input-container">
          <input
            value={inputData}
            onChange={(e) => {
              setInputData(e.target.value); // Update input on typing
            }}
            onKeyUp={async (e) => {
              // Handle Enter key press
              if (e.key === "Enter" && e.target.value.trim() === "") {
                toast.error("No text Entered!!!"); // Show error if empty
              }

              if (e.key === "Enter" && e.target.value.trim() !== "") {
                const text = await axios.post(`${baseURL}/notes`, {
                  text: inputData,
                });

                if (text.data.text === inputData) {
                  toast.success("Note added."); // Show success
                  setNotes([...notes, text.data]); // Append new note
                  console.log(text.data);
                } else {
                  toast.error("Failed to add note!!!");
                  console.log(text);
                }
              }

              // Clear input after Enter
              e.key === "Enter" && setInputData("");
            }}
            placeholder="Add notes...."
          />
          <button
            className="but"
            onClick={async () => {
              if (inputData.trim() !== "") {
                const text = await axios.post(`${baseURL}/notes`, {
                  text: inputData,
                });

                if (text.data.text === inputData) {
                  toast.success("Note added.");
                  setNotes([...notes, text.data]);
                } else {
                  toast.error("Failed to add note!!!");
                }

                setInputData(""); // Clear input after adding
              } else {
                toast.error("No text Entered!!!");
              }
            }}
          >
            Add
          </button>
        </div>

        <br />
        <br />

        {/* Notes display */}
        <ul>
          {(() => {
            try {
              return notes.map((data, index) => (
                <li key={data.id || index}>
                  {data.text}

                  {/* Delete button */}
                  <button
                    className="del"
                    onClick={async () => {
                      // Filter out the note to be deleted and send updated array
                      items = await axios.post(`${baseURL}/notes`, {
                        notes: notes.filter((note) => note.id !== data.id),
                      });

                      if (items.data.length === notes.length - 1) {
                        toast.success("Note deleted.");
                        setNotes(items.data); // Update state with new notes
                      } else {
                        toast.error("Failed to delete note!!!");
                      }
                    }}
                  >
                    <MdDelete />
                  </button>
                </li>
              ));
            } catch (error) {
              toast.error("Failed to load notes!!!");
              console.error(error);
              return null;
            }
          })()}
        </ul>
      </center>

      {/* Toast container */}
      <Toaster />
    </>
  );
}

export default App;
