const express = require('express')
const app = express()
const ejsLayouts = require('express-ejs-layouts')
require('dotenv').config()
const cookieParser = require('cookie-parser')
const cryptoJS = require('crypto-js')
const db = require('./models/index.js')
const axios = require('axios')
const methodOverride = require('method-override')



// MIDDLEWARE
app.set('view engine', 'ejs') // set the view engine to ejs
app.use(ejsLayouts)// tell express we want to use layouts
app.use(cookieParser()) // give us access to req.cookies
app.use(express.urlencoded({extended: false})) // body parser
app.use(methodOverride('_method'))
app.use("/public", express.static("public"))

// CUSTOM LOGIN MIDDLEWARE
app.use(async (req, res, next) =>{
    if (req.cookies.userId){
        // decrypting the incoming user id from the cookie
        const decryptedId = cryptoJS.AES.decrypt(req.cookies.userId, process.env.SECRET)
        // converting the decrypted id into a readable string
        const decrpytedIdString = decryptedId.toString(cryptoJS.enc.Utf8)
        // querying the database for the user with that id
        const user = await db.user.findByPk(decrpytedIdString)
        // assigning the found user to res.local.user in the routes, and in the ejs
        res.locals.user = user
    }else {
        res.locals.user = null
    }
    // console.log(res.locals)
    next()// move on to the next middleware
})

// CONTROLLERS
app.use('/users',require('./controllers/users.js'))
app.use('/comments', require('./controllers/comments.js'))
app.use('/images', require('./controllers/images.js'))

// ROUTES
app.get('/', (req, res) => {
    res.render('home.ejs')
})

const PORT = process.env.PORT || 8000

app.listen(PORT, () => {
    console.log(`Auth app running on ${PORT}`)
})