const mongoose = require('mongoose')
const applicationSchema = new mongoose.Schema({
company: {
  type: 'string',
  require: true 
},
title: {
  type: 'string',
  require: true 
},
postinglink:{
  type: 'string'
},
status:{
  type: 'string',
  enum: ['intersted' , 'applied' , 'interviewing' , 'rejected' , 'accepted']
}


})

const userSchema = new mongoose.Schema({
  username : {
    type : 'string' , 
    required : true
  },
  password : {
    type : 'string' , 
    required : true
  },
  applicatons: [applicationSchema]

}, {
  timestamps: true // createdAt , updatedAt
})

// const App = mongoose.model('App' , applicationSchema)
const User = mongoose.model('User' , userSchema)
module.exports = User 