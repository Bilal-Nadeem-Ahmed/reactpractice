const mongoose  = require('mongoose')
const supertest= require('supertest')
const helper = require('./tests_helper')
const app = require('../app')
const api = supertest(app)
const bcrypt = require('bcrypt')
const User = require('../models/user')

let tempToken
// beforeAll(async() => {
//   const info= await api.post('/api/login')
//     .send({
//       username: 'rouot',
//       password: 'lainen'
//     })
//   tempToken = info.body
//   console.log(tempToken)
//   return tempToken
// })
//...



describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()


  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)


    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })
  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('`username` to be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })
})


describe('logging in', () => {
  beforeAll(async() =>
  {
    const newUser = {
      username: 'roogt',
      name: 'Superuser',
      password: 'salainegn',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
  })


  test('user can login successfully',async () => {
    const loginInfo = {
      username: 'roogt',
      password: 'salainegn',
    }
    await api
      .post('/api/login')
      .send(loginInfo)
      .expect(200)


  })


  test('addition of a new note succeeds with valid data', async () => {
    //login and get token
    const loginInfo = {
      username: 'roogt',
      password: 'salainegn',
    }
    const login= await api
      .post('/api/login')
      .send(loginInfo)
      .expect(200)
    const newNote = {
      content: 'async/await simplifies making async calls',
      important: true,
    }

    await api
      .post('/api/notes')
      .set('Authorization', `Bearer ${login.body.token}`)
      .send(newNote)
      .expect(200)
      .expect('Content-Type', /application\/json/)

  })


  test('fails with 401 if un authorised', async () => {
    const newNote = {
      content: 'async/await simplifies making async calls',
      important: true,
    }

    await api
      .post('/api/notes')
      .send(newNote)
      .expect(401)
      .expect('Content-Type', /application\/json/)



  })
  test('fails with status code 400 if data invaild', async () => {
    //login and get token
    const loginInfo = {
      username: 'roogt',
      password: 'salainegn',
    }
    const login= await api
      .post('/api/login')
      .send(loginInfo)
      .expect(200)

    const newNote = {
      important: true
    }

    await api
      .post('/api/notes')
      .set('Authorization', `Bearer ${login.body.token}`)
      .send(newNote)
      .expect(400)

    const notesAtEnd = await helper.notesInDb()

    expect(notesAtEnd).toHaveLength(helper.initialNotes.length)
  })
})

afterAll(() => {
  mongoose.connection.close()
})