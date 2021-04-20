const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')
const Budget = require('../models/budget')
const User = require('../models/user')
const bcrypt = require('bcrypt')

beforeEach( async() => {

    await Budget.deleteMany({})
    
    const budgetObjects = helper.initialBudgets.map( b => new Budget(b))
    const promiseArray = budgetObjects.map( budget => budget.save())
    await Promise.all(promiseArray) 
    
})

test('budgets are returned as json', async() => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('tester', 10)
    const testUser = new User({
        name:" mulero",
        username: "mulero kun",
        password:passwordHash
    })

    await testUser.save()


    const loggedinUser = await api
      .post('/api/login')
      .send( {
          username:"mulero kun",
          password:"tester" 
      })

    const token = loggedinUser.body.token  

    await api
      .get('/api/budgets')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)
})

afterAll(() => {
    mongoose.connection.close()
})