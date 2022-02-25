const express = require('express')
const app = express()
const ejsLayouts = require('express-ejs-layouts')
require('dotenv').config()

app.set('view engine', 'ejs')
app.use(ejsLayouts)

app.get('/', (req, res) => {
    res.render('home.ejs')
})

const PORT = process.env.PORT || 8000
app.listen(PORT, () => {
    console.log(`Auth app running on ${PORT}`)
})