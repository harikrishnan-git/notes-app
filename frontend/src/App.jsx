import { useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { MdDelete } from "react-icons/md";
import "./App.css";

function App() {
  const [notes, setNotes] = useState([]);
  const [inputData, setInputData] = useState("");

  useEffect(() => {
    const func = async () => {
      const recNotes = axios
        .get("http://localhost:3000/notes")
        .then((recNotes) => {
          setNotes(recNotes.data);
          console.log(recNotes.data);
        });
    };
    func();
  }, []);

  return (
    <>
      <center>
        <h1 className="heading">📝 Note-Maker</h1>
        <div className="input-container">
          <input
            value={inputData}
            onChange={(e) => {
              setInputData(e.target.value);
            }}
            onKeyUp={async (e) => {
              if (e.key === "Enter" && e.target.value.trim() === "") {
                toast.error("No text Entered!!!");
              }
              if (e.key === "Enter" && e.target.value.trim() !== "") {
                const text = await axios.post("http://localhost:3000/notes", {
                  text: inputData,
                });
                if (text.data.text === inputData) {
                  toast.success("Note added.");
                  setNotes([...notes, text.data]);
                  console.log(text.data);
                } else {
                  toast.error("Failed to add note!!!");
                  console.log(text);
                }
              }
              e.key === "Enter" && setInputData("");
            }}
            placeholder="Add notes...."
          />
          <button
            className="but"
            onClick={async () => {
              if (inputData.trim() !== "") {
                const text = await axios.post("http://localhost:3000/notes", {
                  text: inputData,
                });
                if (text.data.text === inputData) {
                  toast.success("Note added.");
                  setNotes([...notes, text.data]);
                } else toast.error("Failed to add note!!!");
                setInputData("");
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
        <ul>
          {(() => {
            try {
              return notes.map((data, index) => (
                <li key={data.id || index}>
                  {data.text}
                  <button
                    className="del"
                    onClick={async () => {
                      setNotes(notes.filter((note) => note.id !== data.id));
                      toast.success("Note deleted.");
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

      <Toaster />
    </>
  );
}

export default App;
