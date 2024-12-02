const dotenv = require('dotenv')
dotenv.config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const morgan = require('morgan')
const session = require('express-session')
const passUsertoView = require('./middleware/pass-user-to-view')
const isSignedIn = require('./middleware/is-signed-in')


const PORT = process.env.PORT ? process.env.PORT : '3000'

mongoose.connect(process.env.MONGODB_URI)

mongoose.connection.on('connected' , () => {
  console.log(`Connected to mongoDB Database: ${mongoose.connection.name}`)
})

// middlewares
app.use(express.urlencoded({extended : false}))
app.use(methodOverride('_method'))
app.use(morgan('dev'))
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized : true
}))

app.use(passUsertoView)




// require controllers 
const authCtrl = require('./controllers/auth')


// use controller 
app.use('/auth' , authCtrl)

// app.use(express.static('public'));


// root route
app.get('/' , async (req,res) => {
res.render('index.ejs')
})


// vip lounge
app.get('/vip-lounge' , isSignedIn , (req,res) => {
res.send(`Welcome to the party ${req.session.user.username}`)
})

app.listen(PORT , () => {
  console.log(`Listening on port ${PORT}`)
})