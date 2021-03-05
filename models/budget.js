const mongoose = require('mongoose')

const budgetSchema = mongoose.Schema({
    money:Number,
    duration:String
})

const Budget = mongoose.model('Budget', budgetSchema)

module.exports = Budget