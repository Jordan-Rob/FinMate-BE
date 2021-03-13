const mongoose = require('mongoose')

const expenditureSchema = mongoose.Schema({
    expenseName:String,
    price: Number,
    date: Date,
    budget:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Budget'
    }
}) 

const Expenditure = mongoose.model('Expenditure', expenditureSchema)

module.exports = Expenditure
