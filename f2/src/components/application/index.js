import Note from "../note";
import {useState} from 'react'
import axios from 'axios'

const Application = ({notes,setNotes}) => {
  const [newNote, setNewNote] = useState(
    'a new note...'
  ) 
  const[showAll,setShowAll]=useState(false)
    
  const addNote = (event) =>{
    event.preventDefault()
    console.log('clicked',event.target)

    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5,
     
    }
    axios.post('http://localhost:3001/notes',noteObject)
    .then(res=>{
        setNotes(notes.concat(res.data))
        setNewNote('')
      console.log(res)})
   
  }

  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value)
  }
  const toggleImportanceof=(id)=>{
    const url = `http://localhost:3001/notes/${id}`
    const note = notes.find(n=>n.id ===id)
    const changedNote ={...note,important: !note.important}

    axios.put(url,changedNote)
    .then(res=>{
      setNotes(notes.map(note=> note.id !==id? note : res.data))
    })
  }

  const notesToShow =showAll ? notes : notes.filter(note=>note.important )
    return ( <div>
  <h1>Notes</h1>
  <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all' }
        </button>
      </div>
      <ul>
        {notesToShow.map(note =>
             <Note
              key ={note.id}
               note={note}
               toggleImportance={()=>toggleImportanceof(note.id)}/>
             )}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange}/>
        <button type="submit">save</button>
      </form>

    </div> );
}
 
export default Application;