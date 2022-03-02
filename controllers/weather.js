const express = require('express')
const router = express.Router()
const db = require('../models')
require('dotenv').config()
const axios = require('axios')


// FETCHING INSIGHT API
const insight = async () => {
    const url = (`https: //api.nasa.gov/insight_weather/?api_key=${process.env.api_key}`)
    try{
        const response = await axios.get(url)
        console.log(response)
    }catch(err) {
        console.log(err)
    }
}
insight()


module.exports = router