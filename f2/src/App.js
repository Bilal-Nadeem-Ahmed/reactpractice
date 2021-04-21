import './App.css';
import Application from './components/application';
import {useState,useEffect} from 'react'
import noteService from './services/notes'


function App() {
  const [notes,setNotes]=useState([]);
  console.log(noteService)

  useEffect(()=>{
    console.log('effect')
    noteService.getAll()
    .then(initialNotes=>{
      console.log('promise is fulfilled')
      setNotes(initialNotes) })
      

  },[])
  console.log('render', notes.length, 'notes')

 
  return (
    <div className="App">

      <Application notes={notes} setNotes={setNotes}/>
    </div>
  )
}

export default App;
