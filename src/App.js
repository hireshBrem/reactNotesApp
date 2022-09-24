import './App.css';
import { useState, useEffect, useReducer, createContext } from 'react';
import React from 'react';

function App() {

  const[notestate, setNotes] = useState(JSON.parse(localStorage.getItem("notes")) ?? [])

  const[noteTitle, setNoteTitle] = useState("")
  const[noteMessage, setNoteMessage] = useState("")

  useEffect(()=>{
    localStorage.setItem("notes", JSON.stringify(notestate))
  }, [notestate]);

  function removeItem(index) {
    let newList = []

    notestate.forEach((note)=>{
      if(note != notestate[index]){
        newList.push(note)
      }
    })

    setNotes(newList)
    localStorage.setItem("notes", JSON.stringify(notestate))
  }

  function resetInput() {
    document.getElementById("note-title").value =""
    document.getElementById("note-message").value =""
    setNoteTitle("")
    setNoteMessage("")
  }

  function handleSubmit() {
    if(noteTitle===""){
      console.log("Note must have atleast a title")
    }else{
      setNotes(notestate=> [...notestate, {id: notestate.length+1,title: noteTitle, note: noteMessage}])
      resetInput()
    }
  }

  return (
    <>
    <h1 className='text-center text-[35px] underline mb-10'>React Notes App</h1>
    <div className='bg-purple-700 max-w-3xl m-auto rounded-md flex justify-center'>
      <div className="bg-purple-400 max-w-[400px] text-[25px] m-5 rounded-md">
        <input id="note-title" className='bg-purple-200 block m-1 p-2 rounded-md w-[300px]' placeholder='Note title' onChange={(e)=>{setNoteTitle(e.target.value)}} />
        <textarea id="note-message" className='bg-purple-200 block m-1 p-2 rounded-md w-[300px]' placeholder='Your note' onChange={(e)=>{setNoteMessage(e.target.value)}}/>
        <button type='submit' className=' bg-cyan-700 p-1 rounded-md m-1 ml-[95px]' onClick={(e)=>{handleSubmit()}}>Add Note</button>
      </div>
    </div>
    <div className='mt-10'>
      <h1 className='text-center text-[30px] underline font-bold italic'>Your Notes</h1>
      <div className='bg-purple-700 max-w-3xl m-auto rounded-md p-1'>
        <div className='max-w-[400px] m-auto'>
          {
            notestate.length==0 ? 
              <div className='m-5 p-2 text-[20px] text-center bg-purple-300 rounded-md'>
                <h1 className='underline'>No notes</h1>
              </div>            
              : 
            notestate.map((note, index)=>{
              return(
              <div key={note.id} className='m-5 p-2 text-[20px] text-center bg-purple-300 rounded-md'>
                <h1 className='underline'>{note.title}</h1>
                <p>{note.note}</p>
                <button className='bg-red-500 rounded-md p-1 m-2' onClick={(e)=>{removeItem(index)}}>Delete</button>
              </div>
            )})
          }
        </div>
      </div>
    </div>
    </>
  );
}

export default App;
