const express = require("express")
const router = express.Router()
const db = require("../models")
const axios = require("axios")
require("dotenv")
const methodOverride = require("method-override")



// Here we are grabbing the data from the api
router.get("/picOfTheDay", async (req, res) => {
    const url = (`https://api.nasa.gov/planetary/apod?api_key=${process.env.api_key}`)
    try {
        const response = await axios.get(url)
        const apodData = response.data
        res.render("users/picOfTheDay.ejs", {apodData})
    }catch(err) {
        console.log(err)
    }
})

module.exports = router
