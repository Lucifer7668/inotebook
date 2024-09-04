import React from "react";

const NoteItem = (props) => {
  const { note,index } = props;
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
        <i className="bi bi-pencil"></i> Edit
        <i className="bi bi-trash-fill"></i> Delete
        </td>
      </tr>
    </>
  );
};

export default NoteItem;
