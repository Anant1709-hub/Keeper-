import React, { useState, useEffect } from "react";
import axios from "axios";

import "../main.css";

function Main() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [deleted_notes, setDeleted_notes] = useState([]);

  useEffect(() => {
    async function fetchNotes() {
      try {
        const res = await axios.get("http://localhost:5000/notes", {
          withCredentials: true,
        });
        setNotes(res.data);
      } catch (error) {
        console.log("Error loading notes on mount");
        console.error(error.response?.data || error.message);
      }
    }

    fetchNotes();
  }, []);

  useEffect(() => {}, [notes]);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      console.log("I am from handleSubmit");
      await axios.post(
        "http://localhost:5000/notes",
        { title, content },
        { withCredentials: true }
      );
      setTitle("");
      setContent("");
      const res = await axios.get("http://localhost:5000/notes", {
        withCredentials: true,
      });
      console.log(res);
      setNotes(res.data);
    } catch (error) {
      console.log("Error in fetching notes from the backend");
    }
  }

  function handleDelete(id) {
    setNotes(notes.filter((prevnote) => prevnote.filter()));
  }

  return (
    <section className="note-section">
      <h2 className="note-heading">Create a Note</h2>
      <form className="note-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          className="note-input"
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Write your note here..."
          value={content}
          className="note-textarea"
          onChange={(e) => setContent(e.target.value)}
          required
        ></textarea>
        <button type="submit" className="note-button">
          Add Note
        </button>
      </form>

      <div className="notes-display flex flex-wrap justify-center gap-5 mt-10">
        {notes.map((note) => (
          <div
            key={note.id}
            className="relative bg-white/5 border border-white/10 rounded-xl p-5 w-72 text-left shadow-lg"
          >
            <button
              onClick={() => handleDelete(note.id)}
              className="absolute top-3 right-3 bg-cyan-700 hover:bg-cyan-600 text-white text-xs px-2 py-1 rounded transition-all duration-200"
            >
              Delete
            </button>

            <h3 className="text-xl font-semibold mb-2 text-white pr-10 break-words">
              {note.title}
            </h3>
            <p className="text-gray-300 break-words">{note.content}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Main;
