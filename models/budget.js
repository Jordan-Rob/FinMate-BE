const mongoose = require('mongoose')

const budgetSchema = mongoose.Schema({
    money:Number,
    duration:String,
    expenditures:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Expenditure'
        }
    ],
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
})

const Budget = mongoose.model('Budget', budgetSchema)

module.exports = Budget