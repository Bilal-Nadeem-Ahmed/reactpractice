import './App.css';
import Application from './components/application';
import axios from 'axios'
import {useState,useEffect} from 'react'


function App() {
  const [notes,setNotes]=useState([]);

  useEffect(()=>{
    console.log('effect')
    axios.get('http://localhost:3001/notes')
    .then(res=>{
      console.log('promise is fulfilled')
      setNotes(res.data) })
      

  },[])
  console.log('render', notes.length, 'notes')

 
  return (
    <div className="App">

      <Application notes={notes} setNotes={setNotes}/>
    </div>
  )
}

export default App;
