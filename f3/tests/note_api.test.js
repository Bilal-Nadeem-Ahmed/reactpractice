const mongoose  = require('mongoose')
const supertest= require('supertest')
const helper = require('./tests_helper')
const app = require('../app')

const api = supertest(app)

const Note = require('../models/note')

//Runs a function before each of the tests in this file runs. If the function returns a promise or is a generator, Jest waits for that promise to resolve before running the test.
beforeEach(async () => {
  await Note.deleteMany({})

  // the below code can be used but using Promise.all executes the promises paralell to one another, if this might result in an issue we can use a for..of block such as below
  // const noteObjects= helper.initialNotes
  //   .map(note => new Note(note))
  // const promiseArray = noteObjects.map(note => note.save())
  // await Promise.all(promiseArray)

  for( let note of helper.initialNotes){
    let noteObject = new Note(note)
    await noteObject.save()
  }

})


test('notes are returned as json', async () => {
  console.log('entered first test')
  await api
    .get('/api/notes')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all notes are returned', async () => {
  const response = await api.get('/api/notes')
  // execution gets here only after the HTTP request is complete
  // the result of HTTP request is saved in variable response
  expect(response.body).toHaveLength(helper.initialNotes.length)
})

test('a specific note is within the returned notes', async () => {
  const response = await api.get('/api/notes')

  const contents = response.body.map(r => r.content)
  expect(contents).toContain('Browser can execute only Javascript')
  //The toContain method is used for checking that the note given to it as a parameter is in the list of notes returned by the API.
})

test('a valid note can be added', async () => {
  const newNote = {
    content : 'async/await simplifies making async calls',
    important: true
  }

  await api
    .post('/api/notes')
    .send(newNote)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const notesAtEnd = await helper.notesInDb()
  expect(notesAtEnd).toHaveLength(helper.initialNotes.length +1)

  const contents = notesAtEnd.map(r => r.content)


  expect(contents).toContain('async/await simplifies making async calls')
})

test('note without content is not added', async () => {
  const newNote={
    important: true
  }
  await api
    .post('/api/notes')
    .send(newNote)
    .expect(400)

  const notesAtEnd= await helper.notesInDb()

  expect(notesAtEnd).toHaveLength(helper.initialNotes.length)


})

test('a specific note can be viewed', async () => {
  const notesAtStart = await helper.notesInDb()

  const noteToView = notesAtStart[0]

  const resultNote = await api
    .get(`/api/notes/${noteToView.id}`)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const processedNoteToView = JSON.parse(JSON.stringify(noteToView))
  expect(resultNote.body).toEqual(processedNoteToView)

})

test('a note can be deleted', async () => {
  const notesAtStart = await helper.notesInDb()
  const noteToDelete = notesAtStart[0]

  await api
    .delete(`/api/notes/${noteToDelete.id}`)
    .expect(204)

  const notesAtEnd = await helper.notesInDb()

  expect(notesAtEnd).toHaveLength(
    helper.initialNotes.length - 1
  )

  const contents = notesAtEnd.map(r => r.content)

  expect(contents).not.toContain(noteToDelete.content)
})




afterAll(() => {
  mongoose.connection.close()
})


