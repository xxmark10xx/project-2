const express = require('express')
const router = express.Router()
const db = require('../models')
const bcrypt = require('bcrypt')
const cryptojs = require('crypto-js')
const axios = require('axios')
require('dotenv').config()

router.get('/profile', async (req, res) => {
        const url = (`https://api.nasa.gov/planetary/apod?api_key=${process.env.api_key}`)
        try{
            const response = await axios.get(url)
            const apodData = response.data
            
            console.log(apodData['title'])
            res.render('users/profile.ejs', {apodData})
           
        }catch (err){
            console.log(err)
        }
})


router.get('/new', (req, res)=>{
    res.render('users/new.ejs')
})

router.post('/', async (req, res) => {
    const [newUser, created] = await db.user.findOrCreate({
        where: {email: req.body.email}
    })
    if(!created){
        console.log('User already exists')
        // render the login page and send appropriate message
    }else {
        // hashing a password with bcrypt
        const hashedPassword = bcrypt.hashSync(req.body.password, 10)
        newUser.password = hashedPassword
        await newUser.save()

        // encrypt the user id via AES
        const encryptedUserId = cryptojs.AES.encrypt(newUser.id.toString(), process.env.SECRET)
        const encryptedUserIdString = encryptedUserId.toString()
        // store encrypted id in the cookie of the res obj
        res.cookie('userId', encryptedUserIdString)
        // redirect back to homepage
        res.redirect('/')
    }
})

router.get('/login', (req, res) =>{
    res.render('users/login.ejs', {error: null})
})

router.post('/login', async (req, res) =>{
    const user = await db.user.findOne({where: { email: req.body.email}})
    if(!user) { // didn't find user in the database
        console.log('User Not Found')
        res.render('users/login.ejs', {error: 'Invalid email/password'})
    }else if (!bcrypt.compareSync(req.body.password, user.password)) { // found user but password was wrong
        console.log('Incorrect Password')
        res.render('users/login.ejs', {error: 'Invalid email/password'})
    } else {
        console.log('logging in the user!')
        // encrypt the user id via AES
        const encryptedUserId = cryptojs.AES.encrypt(user.id.toString(), process.env.SECRET)
        const encryptedUserIdString = encryptedUserId.toString()
        // store encrypted id in the cookie of the res obj
        res.cookie('userId', encryptedUserIdString)
        // redirect back to homepage
        res.redirect('/')
    }
})

router.get('/mars', async (req, res) => {
   
    const url = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=2015-6-3&api_key=${process.env.api_key}`
    try{
        const response = await axios.get(url)
        const roverData = response.data

        console.log(roverData.photos.camera)
        res.render('users/mars.ejs', {roverData})
    }catch(err) {
        console.log(err)
    }
})

router.get('/comments', (req, res) => {
    res.render('users/comments.ejs')
})

router.put('/comments/:id', (req, res) => {
    res.send()
})

router.delete('/comments/:id', async (req, res) => {
    const findComment = await db.findOne({
        
    })
})


router.get('/logout', (req, res) =>{
    console.log('logging out')
    res.clearCookie('userId')
    res.redirect('/')
})


//exports all these routes to the entry point
module.exports = router
