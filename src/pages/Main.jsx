import React, { useState, useEffect } from "react";
import axios from "axios";

import "../main.css";

function Main() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

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

      <div className="notes-display">
        {notes.map((note) => (
          <div key={note.id} className="note-card">
            <h3>{note.title}</h3>
            <p>{note.content}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Main;
