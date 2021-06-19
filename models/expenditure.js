const mongoose = require('mongoose')

const expenditureSchema = mongoose.Schema({
    expenseName:String,
    amount: Number,
    date: Date.now(),
    budget:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Budget'
    }
}) 

const Expenditure = mongoose.model('Expenditure', expenditureSchema)

module.exports = Expenditure
