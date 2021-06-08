const mongoose  = require('mongoose')
const supertest= require('supertest')
const app = require('../app')

const api = supertest(app)

test('notes are returned as json', async () => {
  await api
    .get('/api/notes')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are to notes', async () => {
  const response = await api.get('/api/notes')
  // execution gets here only after the HTTP request is complete
  // the result of HTTP request is saved in variable response
  expect(response.body).toHaveLength(2)
})

test('the first notes content is gibberish', async () => {
  const response = await api.get('/api/notes')
  expect(response.body[0].content).toBe('jyhtdrffjhgdf')
})

afterAll(() => {
  mongoose.connection.close()
})


