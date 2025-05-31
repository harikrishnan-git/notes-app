import { useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import "./App.css";

function App() {
  const [notes, setNotes] = useState([]);
  const [text, setText] = useState("");
  const [inputData, setInputData] = useState("");

  useEffect(() => {
    const recNotes = axios.get("/notes");
    setNotes(recNotes);
  }, []);

  return (
    <>
      <center>
        <h1 className="heading">📝 Note-Maker</h1>
        <input
          value={inputData}
          onChange={(e) => {
            setInputData(e.target.value);
          }}
          onKeyUp={(e) => {
            if (e.key === "Enter" && e.target.value.trim() === "") {
              toast.error("No text Entered!!!");
            }
            if (e.key === "Enter" && e.target.value.trim() !== "") {
              const text = axios.post("/notes", {
                text: inputData,
              });
              if (text === inputData) toast.success("Note added.");
              else toast.error("Failed to add note!!!");
            }
            e.key === "Enter" && setInputData("");
          }}
          placeholder="Add notes...."
        />
        <button
          className="but"
          onClick={() => {
            if (inputData.trim() !== "") {
              axios.post("/notes", {
                text: inputData,
              });
              setInputData("");
            } else {
              toast.error("No text Entered!!!");
            }
          }}
        >
          Submit
        </button>
        <br />
        <br />
        <ul>
          {notes.map((index, data) => {
            <li key={index}>
              <p>data.text</p>
            </li>;
          })}
        </ul>
      </center>

      <Toaster />
    </>
  );
}

export default App;
