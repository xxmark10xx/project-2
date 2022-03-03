const express = require('express')
const router = express.Router()
const db = require('../models')
require('dotenv').config()
const axios = require('axios')


const apod = async () => {
    const url = (`https://api.nasa.gov/planetary/apod?api_key=${process.env.api_key}`)
    try{
        const response = await axios.get(url)
        const apodData = response.data
        console.log(response)
        
    }catch (err){
        console.log(err)
    }
}

apod()

module.exports = router