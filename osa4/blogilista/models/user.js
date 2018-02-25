const mongoose = require('mongoose')

const User = mongoose.model('User', {
    username: String,
    name: String,
    password: String,
    age: Boolean
})
  
module.exports = User