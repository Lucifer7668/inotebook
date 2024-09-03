import React,{useContext, useEffect} from 'react'
import NoteContext from '../context/notes/NoteContext'

const About = () => {
    const a = useContext(NoteContext)
    useEffect(()=>{
        a.update();
    },[])
  return (
    <div>
      this is about {a.state.name} and he's in class {a.state.class}
    </div>
  )
}

export default About
