/*
const expenditureRouter = require('express').Router()
const Expenditure = require('../models/expenditure')
const Budget = require('../models/budget')

expenditureRouter.get('/', async(request, response) => {
    const expenditures = await Expenditure.find({}).populate('budget', { money:1 }) 
    response.status(200).json(expenditures)
})

expenditureRouter.get('/:id', async (request, response) => {
    const expenditure = await Expenditure.findById(request.params.id)
    if(expenditure){
        return response.status(200).json(expenditure)
    }else {
        return response.status(404),json({
            error:"not found"
        })
    }
})

expenditureRouter.post('/', async(request, response) => {
    const body = request.body

    const expenditure = new Expenditure({

    })
} )


module.exports = expenditureRouter

*/