const express = require('express')
const router = express.Router()
const db = require('../models')
require('dontenv').config()


const apod = async () => {
    const url = (`https://api.nasa.gov/planetary/apod?api_key=${process.env.api_key}`)
    try{
        const response = await axios.get(url)
        console.log(response)
    }catch (err){
        console.log(err)
    }
}

module.exports = router