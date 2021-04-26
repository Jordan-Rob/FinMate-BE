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


test('new budget can be added', async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('tester', 10)
    const testUser = new User({
        name:" mulero",
        username: "mulero kun",
        password:passwordHash
    })

    await testUser.save()

    const response = await api
                        .post('/api/login')
                        .send({
                            username:"mulero kun",
                            password:"tester"
                        })

    const token = response.body.token

    const newBudget = {
        money:"265,000 UGX",
        duration:"2 weeks"
    }
    
    await api
      .post('/api/budgets')
      .send(newBudget)
      .set('Authorization', `Bearer ${token}`)
      .expect(201)

    const budgets = await api.get('/api/budgets').set('Authorization', `Bearer ${token}`)
    
    const monies = budgets.body.map( budget => budget.money )
    expect(monies).toContain( "265,000 UGX" )

})

test('can access a specific budget', async() => {
    const budgets = await helper.budgetsInDB()
    const noteToView = budgets[0]

    const response = await api
                       .get(`/api/budgets/${noteToView._id}`)
                       .expect(200)
                       .expect('Content-Type', /application\/json/)

    expect(response.body.money).toContain("2,300,000")                    
})

test('a budget can be deleted', async() => {
    const budgets = await helper.budgetsInDB()
    const budgetToDelete = budgets[0]

    const response = await api
                       .delete(`/api/budgets/${budgetToDelete._id}`)
                       .expect(204)

    const budgetsAtEnd = await helper.budgetsInDB()
    expect(budgetsAtEnd).toHaveLength(helper.initialBudgets.length - 1)

})

afterAll(() => {
    mongoose.connection.close()
})
