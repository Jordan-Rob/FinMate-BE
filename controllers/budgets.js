const budgetRouter = require('express').Router()
const Budget = require('../models/budget')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const getToken = (request) => {
    const authorization = request.get('authorization')
    if( authorization && authorization.toLowerCase().startsWith('bearer ')){
        return authorization.substring(7)
    }
}

budgetRouter.get('/', async(request, response) => {
    const token = getToken(request)
    const decodedToken = jwt.verify(token, process.env.SECRET)

    if(!token || !decodedToken.id){
        return response.status(401).json({
            error:'token invalid or missing'
        })
    }

    const budgets = await Budget.find({username:decodedToken.username})
    response.status(200).json(budgets)
})