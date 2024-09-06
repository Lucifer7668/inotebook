import React, { useContext, useEffect, useRef, useState } from "react";
import NoteContext from "../context/notes/NoteContext";
import NoteItem from "./NoteItem";
import Addnote from "./Addnote";

const Notes = () => {
    const context = useContext(NoteContext);
    const { notes, getNotes, editNote } = context;
    const modalOpen = useRef(null);
    const modalClose = useRef(null);
    const [note, setNote] = useState({
        id: "",
        etitle: "",
        edescription: "",
        etag: "",
    });
    useEffect(() => {
        getNotes(); // Fetch data when the component is mounted
        // eslint-disable-next-line
    }, []);
    const updateNote = (currentNote) => {
        modalOpen.current.click();
        setNote({
            id: currentNote._id,
            etitle: currentNote.title,
            edescription: currentNote.description,
            etag: currentNote.tag,
        });
    };
    const handlick = (e) => {
        console.log("saving updated date", note);
        editNote(note.id, note);
        modalClose.current.click();
    };
    const onChange = (e) => {
        e.preventDefault();
        setNote({ ...note, [e.target.name]: e.target.value });
    };
    return (
        <>
            <Addnote />
            <button
                type="button"
                ref={modalOpen}
                className="btn btn-primary d-none"
                data-bs-toggle="modal"
                data-bs-target="#editModal"
            >
                Launch modal
            </button>
            <div
                className="modal fade"
                id="editModal"
                data-bs-backdrop="static"
                data-bs-keyboard="false"
                tabIndex="-1"
                aria-labelledby="editModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="editModalLabel">
                                Modal title
                            </h1>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
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
                                        name="etitle"
                                        value={note.etitle}
                                        aria-describedby="etitle"
                                        onChange={onChange}
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
                                        name="edescription"
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
                                        name="etag"
                                        value={note.etag}
                                        onChange={onChange}
                                    />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                                ref={modalClose}
                            >
                                Close
                            </button>
                            <button
                                type="button"
                                onClick={handlick}
                                className="btn btn-primary"
                            >
                                Update
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <h2>Your Notes</h2>
                {notes && notes.length > 0 ? (
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>Sr No.</th>
                                <th>Title</th>
                                <th>Description</th>
                                <th>Tag</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {notes.map((note, index) => (
                                <NoteItem
                                    key={note._id}
                                    updateNote={updateNote}
                                    note={note}
                                    index={index}
                                />
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No notes found.</p>
                )}
            </div>
        </>
    );
};

export default Notes;
