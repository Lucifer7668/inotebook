import React, { useContext } from 'react'
import NoteContext from '../context/notes/NoteContext';
import NoteItem from './NoteItem';

const Notes = () => {
    const context=useContext(NoteContext);
    const {notes,setNotes}=context;
  return (
    <>
    <div className="container">
        <h2>Your Notes</h2>
        <table className='table table-bordered'>
            <thead>
                <tr>
                <th>
                Sr No.
            </th>
            <th>
                Title
            </th>
            <th>
                Description
            </th>
            <th>
                Action
            </th>
                </tr>
           
            </thead>
            <tbody>
            {notes.map((note,index)=>{
          return <NoteItem key={note._id} note={note} index={index}/>
        })}
                
            </tbody>
        </table>
        
      </div></>
  )
}

export default Notes
