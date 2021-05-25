const mongoose = require('mongoose')

// DO NOT SAVE YOUR PASSWORD TO GITHUB!!
// const url =
// `mongodb+srv://user1:MangoYogurt1@cluster0.yaoc2.mongodb.net/notesapp?retryWrites=true&w=majority`

const url = process.env.MONGODB_URI
console.log('connected  to', url)

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
.then((result)=>{console.log('connected to mongodb')})
.catch((error)=>{
    console.log('error connecting to mongodb:',error.message)
})
const noteSchema = new mongoose.Schema({
  content: {
    type : String,
    minLength: 5,
    required:true
  },
  date: {
    type: Date,
    required: true
  },
  important: Boolean
})

noteSchema.set('toJSON',{
  transform:(document,returnedObject)=>{
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports =mongoose.model('Note', noteSchema)

