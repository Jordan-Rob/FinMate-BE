const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')


const userSchema = mongoose.Schema({
    name:String,
    username:{ 
        type: String,
        unique: true
      },
    password:String,
    budgets:[
      {
        type:mongoose.Schema.Types.ObjectId,
        ref:'Budget'
      }
    ]
})

userSchema.plugin(uniqueValidator)

const User = mongoose.model('User', userSchema)

module.exports = User 