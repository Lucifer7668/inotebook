import React, { useState } from "react";
import NoteContext from "./NoteContext";
import { toast } from "react-toastify";

const NoteState = (props) => {
  const [notes, setNotes] = useState([]);
  const API_URL = "http://localhost:8000";
  const token = localStorage.getItem('token');
  // This function will be called to fetch the data
  const getNotes = async () => {
    try {
      const response = await fetch(`${API_URL}/api/notes/fetchallnotes`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`, // Send the Bearer token in the Authorization header
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        toast.error(response.status);
      }

      const result = await response.json();
      setNotes(result); // Store the data in your state
    } catch (err) {
      toast.error(err.message);
    }
  };
  // Add a  note
  const addNote = async (note) => {
    try {
       
      const response = await fetch(`${API_URL}/api/notes/savenote`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`, // Send the Bearer token in the Authorization header
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: note.title,
          description: note.description,
          tag: note.tag,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json(); // Extract error details from the response
        // Display the error messages
        if (errorData.errors) {
          Object.entries(errorData.errors).forEach(([field, message]) => {
            toast.error(`${message} in ${field}`); // Display each error message
          });
        } else {
          toast.error(`Error: ${response.status}`); // General error if no detailed messages
        }
        return; // Stop further execution
      }

      const result = await response.json();
      const newNote = {
        id: result._id,  // Use the id from the result
        title: result.title,  // Ensure you use the correct title from the response if required
        description: result.description,  // Use the response description if needed, else from `note`
        tag: result.tag,  // Similarly for tag
      };

      toast.success("Note Added successfully");
      console.log(newNote);
      setNotes(notes.concat(newNote));
    } catch (err) {
      toast.error(err.message);
    }
  };
  // Edit a  note
  const editNote = async (id, note) => {
    //API call
    try {
      const response = await fetch(`${API_URL}/api/notes/editnote/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`, // Send the Bearer token in the Authorization header
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: note.etitle,
          description: note.edescription,
          tag: note.etag,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json(); // Extract error details from the response
        // Display the error messages
        if (errorData.errors) {
          Object.entries(errorData.errors).forEach(([field, message]) => {
            toast.error(`${message} in ${field}`); // Display each error message
          });
        } else {
          toast.error(`Error: ${response.status}`); // General error if no detailed messages
        }
        return; // Stop further execution
      }

      const result = await response.json();
      let newNotes=JSON.parse(JSON.stringify(notes));
      //Logic to edit in client
      for (let index = 0; index < newNotes.length; index++) {
        const element = newNotes[index];
        if (element._id === id) {
          newNotes[index].title = result.title;
          newNotes[index].description = result.description;
          newNotes[index].tag = result.tag;
          break;

        }
      }
      setNotes(newNotes);
      toast.success("Note Edited Succesfully");
    } catch (err) {
      toast.error(err.message);
    }
    
  };
  // Delete a  note
  const deleteNote = async (id) => {
    try {
      const response = await fetch(`${API_URL}/api/notes/deletenote/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`, // Send the Bearer token in the Authorization header
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json(); // Extract error details from the response
        // Display the error messages
        if (errorData.errors) {
          Object.entries(errorData.errors).forEach(([field, message]) => {
            toast.error(`${message} in ${field}`); // Display each error message
          });
        } else {
          toast.error(`Error: ${response.status}`); // General error if no detailed messages
        }
        return; // Stop further execution
      }

      await response.json();
      const newNotes = notes.filter((note) => {
        return note._id !== id;
      });
      setNotes(newNotes);
      toast.success("Note Deleted Succesfully");
    } catch (err) {
      toast.error(err.message);
    }
  };
  return (
    <NoteContext.Provider
      value={{ notes, addNote, deleteNote, editNote, getNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};
export default NoteState;
