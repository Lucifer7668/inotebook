import React, { useContext } from "react";
import NoteContext from "../context/notes/NoteContext";

const NoteItem = (props) => {
    const context=useContext(NoteContext);
    const {deleteNote}=context;
  const { note,index,updateNote } = props;
  return (
    <>
      <tr>
        <td>
        {index+1}
        </td>
        <td>
        {note.title}
        </td>
        <td>
    {note.description}
        </td>
        <td>
    {note.tag}
        </td>
        <td>
        <i className="bi bi-pencil" onClick={()=>{updateNote(note)}}></i>
        <i className="bi bi-trash-fill mx-2"  onClick={()=>{deleteNote(note._id)}}></i>
        </td>
      </tr>
    </>
  );
};

export default NoteItem;
