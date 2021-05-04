const { request, response } = require('express')
const express = require('express')
const app = express()
app.use(express.json())
const morgan = require('morgan')
morgan.token('resdata', (request,response)=> JSON.stringify(request.body))

// app.use(morgan('tiny')) 


app.use(morgan(':method :url :status :response-time ms - :resdata '));

const cors= require('cors')
app.use(cors())





let notes = [
    {
      id: 1,
      content: "HTML is easy",
      date: "2019-05-30T17:30:31.098Z",
      important: true
    },
    {
      id: 2,
      content: "Browser can execute only Javascript",
      date: "2019-05-30T18:39:34.091Z",
      important: false
    },
    {
      id: 3,
      content: "GET and POST are the most important methods of HTTP protocol",
      date: "2019-05-30T19:20:14.298Z",
      important: true
    }
  ]

 


app.get('/',(request,response)=>{
  response.send('<h1>Hello world</h1>')
})
app.get('/api/notes', (request,response)=>{
  response.json(notes)
})
app.get('/api/notes/:id',(request,response)=>{
  const id= Number(request.params.id)
  const note=notes.find(note=> note.id===id)
  if(note){
    response.json(note)
  } else {
    response.status(404).end()
  }
  
})
app.delete('/api/notes/:id',(request,response)=>{
  const id=Number(request.params.id)
  notes = notes.filter(note=>note.id !== id)
console.log(id , 'deleted')
  response.status(204).end()
})

const generateId=()=>{
  const maxId = notes.length>0 ? Math.max(...notes.map(n=>n.id)) : 0
  return maxId + 1
}

app.put('/api/notes/:id',(request,response)=>{

  const body = request.body
  const note = {
    content: body.content,
    id: body.id,
    important: body.important ,
    date: body.date
  }
  notes.map(item=>item.id===note.id? note:item)
  // console.log(notes)
  
  response.json(note)
})

app.post('/api/notes',(request,response)=>{

  const body = request.body

  if(!body.content) {
    return response.status(400).json({error:'content missing'})
  }

  const note = {
    content: body.content,
    id: generateId(),
    important: body.important || false,
    date: new Date()
  }
  notes.concat(note)
  // console.log(notes)
  
  response.json(note)
})

//middleware

// const requestLogger = (request,response,next)=>{
//   console.log('method:',request.method)
//   console.log('Path:',request.path)
//   console.log('body:' , request.body)
//   console.log('---')
//   next()
// }

// app.use(requestLogger)


// 404 middleware 

const unknownEndpoint =(request,response)=>{
  response.status(404).send({error: 'unknown endpoint'})
}
app.use(unknownEndpoint)





const PORT = process.env.PORT||3001
app.listen(PORT,()=>{
  console.log(`server is running on port ${PORT}`)
})