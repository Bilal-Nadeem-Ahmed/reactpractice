import './App.css';
import Application from './components/application';
import {useState,useEffect} from 'react'
import noteService from './services/notes'


function App() {
  const [notes,setNotes]=useState([]);
  console.log(noteService)
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')

  useEffect(()=>{
    console.log('effect')
    noteService.getAll()
    .then(initialNotes=>{
      console.log('promise is fulfilled')
      setNotes(initialNotes) })
      

  },[])
  console.log('render', notes.length, 'notes')
  const handleLogin = (event)=>{
    event.preventDefault()
    console.log('logging in with', username,password)
  }

 
  return (
    <div className="App">

      <Application notes={notes} setNotes={setNotes}/>
      <form>
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
    </div>
  )
}

export default App;
