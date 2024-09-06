import React, { useContext, useState } from 'react'
import NoteContext from '../context/notes/NoteContext'

const Addnote = () => {
    const context=useContext(NoteContext);
    const {addNote}=context;
    const [note,setNote]=useState({title:"",description:"",tag:""});
    const handlick=()=>{
        addNote(note);
        setNote({title:"",description:"",tag:""})
    }
    const onChange=(e)=>{
        e.preventDefault();
        setNote({...note,[e.target.name]:e.target.value})

    }
  return (
   <>
    <div className="container my-3">
        <h2>Add a note</h2>
        <form>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              name='title'
              value={note.title}
              aria-describedby="title" onChange={onChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <input
              type="text"
              className="form-control"
              id="description"
              name='description'
              value={note.description}
              onChange={onChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">
              Tag
            </label>
            <input
              type="text"
              className="form-control"
              id="tag"
              name='tag'
              value={note.tag}
              onChange={onChange}
            />
          </div>
          
          <button type="button" onClick={handlick} className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
   </>
  )
}

export default Addnote
