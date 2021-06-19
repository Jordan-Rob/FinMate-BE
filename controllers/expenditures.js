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

    const budget = await Budget.find({name:body.budget})

    const expenditure = new Expenditure({
        expenseName:body.expenseName,
        amount:body.amount,
        date:body.date,
        budget:budget._id
    })

    const savedExpenditure = await expenditure.save()
    response.status(201).json(savedExpenditure)
    budget.expenditures = budget.expenditures.concat(savedExpenditure._id)
    await budget.save()

} )

expenditureRouter.put('/:id', async(request,response) => {
    const body = request.body

    const budget = await Budget.find({name:body.budget})
    const expenditure = {
        expenseName:body.expenseName,
        amount:body.amount,
        date:body.date,
        budget:budget._id
    }

    const updatedExpenditure = await Expenditure.findByIdAndUpdate(request.params.id, expenditure)
    response.json(updatedExpenditure)


})

expenditureRouter.delete('/:id', async(request, response) => {
    await Expenditure.findByIdAndRemove(request.params.id)
    response.status(204).end()
})


module.exports = expenditureRouter

