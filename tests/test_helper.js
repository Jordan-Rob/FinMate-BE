const Expenditure = require('../models/expenditure')
const Budget = require('../models/budget')
const User = require('../models/user')

const initialBudgets = [
    {
        money: "2,300,000",
        duration: "1 week"
    },
    {
        money:"300,000",
        duration:"3 weeks"
    }
]

const nonExistingID = async() => {
    const budget = new Budget({
        money:"1,400,000",
        duration:'5 days'
    })

    await budget.save()
    await budget.remove()

    return budget._id.toString()
}

const budgetsInDB = async () => {
    const budgets = await Budget.find({})
    return budgets.map( b => b.toJSON())
}

const usersInDB = async () => {
    const users = await User.find({})
    return users.map( user => user.toJSON())
}

module.exports = {
    initialBudgets, nonExistingID, budgetsInDB, usersInDB
}