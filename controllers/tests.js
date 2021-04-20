const testingRouter = require('express').Router()
const User = require('../models/user')
const Budget = require('../models/budget')
const Expenditure = require('../models/expenditure')

testingRouter.post('/reset', async(request, response) => {
    await Expenditure.deleteMany({})
    await Budget.deleteMany({})
    await User.deleteMany({})

    response.status(204)
})

module.exports = testingRouter