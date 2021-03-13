const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post('/', async(request, response) => {
    const body = request.body

    const user = await User.findOne({username:body.username})
    const correctPassword = user === null?
        false: await bcrypt.compare(body.password, user.password)

    if(!( user && correctPassword)){
       return response.status(401).json({
           error:'password or username is invalid'
       })
    }
    const userToken = {
        username:user.username,
        id:user._id
    }

    const token = jwt.sign(userToken, process.env.SECRET)

    response
      .status(200)
      .json({token, username:user.username, name:user.name})
    })

module.exports = loginRouter    