const mongoose = require('mongoose')

const expenditureSchema = mongoose.Schema({
    expenseName:String,
    price: Number,
    Date: Date 
}) 

const Expenditure = mongoose.model('Expenditure', expenditureSchema)

module.exports = Expenditure
