const budgetRouter = require('express').Router()
const Expenditure = require('../models/expenditure')
const Budget = require('../models/budget')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const getToken = (request) => {
    const authorization = request.get('authorization')
    if( authorization && authorization.toLowerCase().startsWith('bearer ')){
        return authorization.substring(7)
    }
}

//BUDGET DETAILS ******************************

budgetRouter.get('/', async(request, response) => {
    const token = getToken(request)
    const decodedToken = jwt.verify(token, process.env.SECRET)

    if(!token || !decodedToken.id){
        return response.status(401).json({
            error:'token invalid or missing'
        })
    }

    //const user = await User.findById(decodedToken.id)
    const budgets = await Budget.find({user:decodedToken.id}).populate('user', {name:1, username:1})
    response.status(200).json(budgets)
})

budgetRouter.post('/', async(request, response) => {
    const body = request.body
    const token = getToken(request)

    const decodedToken = jwt.verify(token, process.env.SECRET) 

    if(!token || !decodedToken.id){
        return response.status(401).json({
            error:'token invalid or missing'
        })
    }

    const user = await User.findById(decodedToken.id)
    console.log(user)
    
    const budget = new Budget({
      money:body.money,
      duration:body.duration,
      user:user._id
    })  

    console.log(budget.user)

    const savedBudget = await budget.save()
    response.status(201).json(savedBudget)
    user.budgets = user.budgets.concat(savedBudget._id)
    await user.save()
})

budgetRouter.get('/:id', async(request, response) => {
    const budget = await Budget.findById(request.params.id).populate('user', { name:1, username:1 })

    if(budget){
        return response.status(200).json(budget)
    }else {
        return response.status(404).json({
            error: "not found"
        }) 
    }
})

budgetRouter.delete('/:id', async(request, response) => {
    const budget = await Budget.findByIdAndRemove(request.params.id)
    response.status(204).end()
})


// EXPENDITURE DETAILS ****************************************


budgetRouter.get('/:budgetID/expenditures', async(request, response) => {
    const expenditures = await Expenditure.find({budget:request.params.budgetID}).populate('budget', { money:1 }) 
    response.status(200).json(expenditures)
})

budgetRouter.get('/:budgetID/expenditures/:id', async (request, response) => {
    const expenditure = await Expenditure.findById(request.params.id)
    if(expenditure){
        return response.status(200).json(expenditure)
    }else {
        return response.status(404),json({
            error:"not found"
        })
    }
})

budgetRouter.post('/:budgetID/expenditures', async(request, response) => {
    const body = request.body
    const budget = await Budget.findById(request.params.budgetID)

    const expenditure = new Expenditure({
        expenseName: body.expenseName,
        price: body.price,
        date: Date.now(),
        budget: budget._id
        
    })

    const savedExpenditure = await expenditure.save()
    response.status(201).json(savedExpenditure)
    budget.expenditures = budget.expenditures.concat(savedExpenditure._id)
    await budget.save()
} )

budgetRouter.delete('/:budgetID/expenditures/:id', async(request, response) => {
    const expenditure = await Expenditure.findByIdAndRemove(request.params.id)
    response.status(204).end()
})

budgetRouter.put('/:budgetID/expenditures/:id', async(request, response) => {
    const body = request.body
    const budget = await Budget.findById(request.params.id)

    const expenditure = {
        expenseName: body.expenseName,
        price: body.price,
        date: Date.now(),
        budget:budget._id
    } 

    const updatedExpenditure = await Expenditure.findByIdAndUpdate(request.params.id, expenditure, {new:true})
    response.json(updatedExpenditure)

})



module.exports = budgetRouter