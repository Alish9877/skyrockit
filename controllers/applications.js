const router = require('express').Router()

// import modedl
const user = require('../models/user')

// will build our router logic here
router.get('/' , (req,res) => {
  res.render('applications/index.ejs')
})

router.get('/new' , (req,res) => {
  res.render('applications/new.ejs')
})




// exports
module.exports = router