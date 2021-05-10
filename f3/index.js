require('dotenv').config()
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




const Note = require('./models/note')



app.get('/',(request,response)=>{
  response.send('<h1>Hello world</h1>')
})
// app.get('/api/notes', (request,response)=>{
//   response.json(notes)
// })
app.get('/api/notes', (request, response) => {
  Note.find({}).then(notes => {
    response.json(notes)
  })
})
app.get('/api/notes/:id',(request,response)=>{
Note.findById(request.params.id).then(note=>{
  response.json(note)
})
  
})
app.delete('/api/notes/:id',(request,response)=>{
  const id=Number(request.params.id)
  notes = notes.filter(note=>note.id !== id)
console.log(id , 'deleted')
  response.status(204).end()
})



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

  const note = new Note({
    content: body.content,
    
    important: body.important || false,
    date: new Date()
  })
 note.save().then(savedNote=>{
   response.json(savedNote)
 })
  
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





const PORT = process.env.PORT
app.listen(PORT,()=>{
  console.log(`server is running on port ${PORT}`)
})