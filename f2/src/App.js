import './App.css';
// import Application from './components/application';
import {useState,useEffect} from 'react'
import noteService from './services/notes'
import loginService from './services/login'
import Notification from './components/notificastion'
import Note from './components/note'
import LoginForm from './components/LoginForm';
import NoteForm from './components/NoteForm';
import Toglable from './components/Togalable';


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
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      noteService.setToken(user.token)
    }
  }, [])

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
        setErrorMessage('New note added!')
        setTimeout(()=>{
          setErrorMessage(null)
        },5000)
      })
   
  }
  const handleLogin = async (event)=>{
    event.preventDefault()
    try{
      const user = await loginService.login({username,password})
      window.localStorage.setItem('loggedNoteappUser',JSON.stringify(user))
      noteService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setErrorMessage(`${username} is successfully logged in`)
      setTimeout(()=>{
        setErrorMessage(null)
      },5000)
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

  const loginForm = ()=>(
    <Toglable buttonLabel='login'>
     <LoginForm username={username} setUsername={setUsername} password={password} setPassword={setPassword} handleLogin={handleLogin}/> 
     </Toglable>

  )
  const noteForm = ()=>{
    return(
      <Toglable buttonLabel='add Note'>
     <NoteForm addNote={addNote} setNewNote={setNewNote} newNote={newNote} />
     </Toglable>
    )
    
  }
  
 
  return (
    <div className="App">
      <h1>Notes</h1>
  <Notification message={errorMessage}/>
     
    <div>
    
    {user === null 
    ?loginForm() 
     :<div>
       <p>{user.username} Logged In</p>
       {noteForm()}
     </div>
     
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
