import React, { useRef, useState } from 'react'

const Modal = (props) => {
    const ref=useRef(null);
    const [note,setNote]=useState({etitle:"",edescription:"",etag:""});
    const handlick=()=>{
       console.log('saving updated date');
    }
    const onChange=(e)=>{
        e.preventDefault();
        setNote({...note,[e.target.name]:e.target.value})

    }
  return (
    <>
  <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#editModal">
        Launch modal
      </button>
    <div className="modal fade" id="editModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="editModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="editModalLabel">Modal title</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <form>
          <div className="mb-3">
            <label htmlFor="etitle" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="etitle"
              name='etitle'
              value={note.etitle}
              aria-describedby="etitle" onChange={onChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="edescription" className="form-label">
              Description
            </label>
            <input
              type="text"
              className="form-control"
              id="edescription"
              name='edescription'
              value={note.edescription}
              onChange={onChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="etag" className="form-label">
              Tag
            </label>
            <input
              type="text"
              className="form-control"
              id="etag"
              name='etag'
              value={note.etag}
              onChange={onChange}
            />
          </div>
          
          <button type="button" onClick={handlick} className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" className="btn btn-primary">Understood</button>
      </div>
    </div>
  </div>
</div>
    </>
  )
}

export default Modal
