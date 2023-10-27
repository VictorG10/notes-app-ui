import React, { useState } from "react";
import "./App.css";

interface Note {
  id: number;
  title: string;
  content: string;
}

const App = () => {
  const [notes, setNotes] = useState<Note[]>([
    {
      id: 1,
      title: "note title 1",
      content: "content 1",
    },
    {
      id: 2,
      title: "note title 2",
      content: "content 2",
    },
    {
      id: 3,
      title: "note title 3",
      content: "content 3",
    },
    {
      id: 4,
      title: "note title 4",
      content: "content 4",
    },
    {
      id: 5,
      title: "note title 5",
      content: "content 5",
    },
  ]);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  const handleNoteClick = (note: Note) => {
    setSelectedNote(note);
    setTitle(note.title);
    setContent(note.content);
  };

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();

    const newNote: Note = {
      id: notes.length + 1,
      title: title,
      content: content,
    };

    setNotes([newNote, ...notes]);
    setTitle("");
    setContent("");
  };

  const handleUpdateNote = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedNote) {
      return;
    }

    const updatedNote: Note = {
      id: selectedNote.id,
      title: title,
      content: content,
    };

    const updatedNoteList = notes.map((note) =>
      note.id === selectedNote.id ? updatedNote : note
    );

    setNotes(updatedNoteList);
    setTitle("");
    setContent("");
    setSelectedNote(null);
  };

  const handleCancel = () => {
    setTitle("");
    setContent("");
    setSelectedNote(null);
  };

  const deleteNote = (e: React.MouseEvent, noteId: number) => {
    e.stopPropagation();

    const updatedNotes = notes.filter((note) => note.id !== noteId);

    setNotes(updatedNotes);
  };

  return (
    <div className="app-container">
      <form
        action=""
        className="notes-form"
        onSubmit={(e) =>
          selectedNote ? handleUpdateNote(e) : handleAddNote(e)
        }
      >
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          name=""
          placeholder="Content"
          id=""
          rows={10}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        ></textarea>

        {selectedNote ? (
          <div className="edit-buttons">
            <button type="submit">Save</button>
            <button type="submit" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        ) : (
          <button type="submit">Add Note</button>
        )}
      </form>

      <div className="notes-grid">
        {notes.map((note, i) => {
          return (
            <div
              className="notes-item"
              key={i}
              onClick={() => handleNoteClick(note)}
            >
              <div className="notes-header">
                <button onClick={(e) => deleteNote(e, note.id)}>x</button>
              </div>
              <h2>{note.title}</h2>
              <p>{note.content} </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default App;
