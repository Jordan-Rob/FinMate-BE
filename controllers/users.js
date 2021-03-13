const bcrypt = require('bcrypt')
const userRouter = require('express').Router()
const User = require('../models/user')

userRouter.post('/', async( request, response ) => {
    const body = request.body

    const noSalts = 10
    const hashedPassword = await bcrypt.hash(body.password, noSalts)

    const user = new User({
        name:body.name,
        username:body.username,
        password:hashedPassword
    })

    const savedUser = await user.save()
    response.status(201).json(savedUser)
})

userRouter.get('/', async(request, response) => {
    const users = await User.find({}).populate('budgets', {money:1, duration:1, expenditures:1})
    response.status(200).json(users)
})

module.exports = userRouter