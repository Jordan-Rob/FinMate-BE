const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')
const User = require('../models/user')
const bcrypt = require('bcrypt')


describe('when theres one user initially in db', () => {
    beforeEach( async() => {
      await User.deleteMany({})

      const passwordHash = await bcrypt.hash('tester', 10)
      const initialUser = new User({ name:" carmen", username: "cara", password:passwordHash })
     
      await initialUser.save()


    })

    test('successful creation of new user', async () => {
        const usersAtStart = await helper.usersInDB()

        const newUser = {
            name:"kris",
            username:"sudomi",
            password:"secret"
        }

        await api
          .post('/api/users')
          .send(newUser)
          .expect(201)
          .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDB()

        expect(usersAtEnd).toHaveLength( usersAtStart.length + 1)

    })

    test('users can be called sucessfully', async () => {
      await api
        .get('/api/users')
        .expect(200)
        .expect('Content-Type', /application\/json/)

    })
})

afterAll(() => {
    mongoose.connection.close()
})

