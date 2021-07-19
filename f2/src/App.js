import './App.css';
// import Application from './components/application';
import {useState,useEffect} from 'react'
import noteService from './services/notes'
import loginService from './services/login'
import Notification from './components/notificastion'
import Note from './components/note'


function App() {
  const [notes,setNotes]=useState([]);
  const [errorMessage, setErrorMessage] = useState(null)
 
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user,setUser] = useState(null)
  const [newNote, setNewNote] = useState(
    'a new note...'
  ) 
  const[showAll,setShowAll]=useState(false)



  useEffect(()=>{
    console.log('effect')
    noteService.getAll()
    .then(initialNotes=>{
      console.log('promise is fulfilled')
      setNotes(initialNotes) })
      

  },[])

  const toggleImportanceof=(id)=>{
    const note = notes.find(n=>n.id ===id)
    const changedNote ={...note,important: !note.important}

    noteService.update(id,changedNote)
    .then(returnedNote=>{
      setNotes(notes.map(note=> note.id !==id? note : returnedNote))
    })
    .catch(error => {
      setErrorMessage(
        `the note '${note.content}' was already deleted from server`
      )
      setTimeout(()=>{
        setErrorMessage(null)
      },5000)
      setNotes(notes.filter(n => n.id !== id))
    })
    
  }

  const notesToShow =showAll ? notes : notes.filter(note=>note.important )
  console.log('render', notes.length, 'notes')
  const addNote = (event) =>{
    event.preventDefault()

    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5,
     
    }
    noteService.create(noteObject)
    .then(returnedNote=>{
        setNotes(notes.concat(returnedNote))
        setNewNote('')
      })
   
  }
  const handleLogin = async (event)=>{
    event.preventDefault()
    try{
      const user = await loginService.login({username,password})
      noteService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch(exception){
      setErrorMessage('Wrong Credentials')
      setTimeout(()=>{
        setUsername('')
        setPassword('')
        setErrorMessage(null)
      },5000)
    }
    console.log('logging in with', username,password)
  }
  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value)
  }

  const loginForm = ()=>(
    <form onSubmit={handleLogin}>
        <div>
          username 
          <input
          type='text'
          value={username}
          name = 'Username'
          onChange={({target})=>setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
          type='password'
          value={password}
          name = 'Password'
          onChange={({target})=>setPassword(target.value)}
          />
        </div>
        <button type='submit'>login</button>
      </form>
  )

  const noteForm = () => (
    <form onSubmit={addNote}>
      <input
        value={newNote}
        onChange={handleNoteChange}
      />
      <button type="submit">save</button>
    </form>  
  )
 
  return (
    <div className="App">
      <h1>Notes</h1>
  <Notification message={errorMessage}/>
     
    <div>
    {user === null ?
      loginForm() :
      noteForm()
    }
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

      
    </div>
  )
}

export default App;
