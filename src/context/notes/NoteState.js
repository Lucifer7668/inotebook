import React ,{ useState } from 'react'
import NoteContext from './NoteContext'


const NoteState=(props)=>{
 const initalNotes=[
        {
          "_id": "66d81b9458495d47d0d82dde",
          "user": "66d81b55907c09cf61a8d750",
          "title": "THis is first",
          "description": "This is first description",
          "tag": "General",
          "created_at": "2024-09-04T08:34:28.529Z",
          "updated_at": "2024-09-04T08:34:28.529Z",
          "__v": 0
        },
        {
          "_id": "66d81baa58495d47d0d82de0",
          "user": "66d81b55907c09cf61a8d750",
          "title": "This is first note ",
          "description": "This is first updated description ",
          "tag": "Youtube",
          "created_at": "2024-09-04T08:34:50.563Z",
          "updated_at": "2024-09-04T08:34:50.563Z",
          "__v": 0
        }
      ]
      const [notes,setNotes]=useState(initalNotes);
return(
<NoteContext.Provider value={{notes,setNotes}}>
        {props.children}
</NoteContext.Provider>
)    
}
export default NoteState