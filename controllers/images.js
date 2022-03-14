const express = require("express")
const router = express.Router()
const db = require("../models")
const axios = require("axios")
require("dotenv")
const methodOverride = require("method-override")



// Here we are grabbing the data from the api
router.get("/", async (req, res) => {
    const url = (`https://api.nasa.gov/planetary/apod?api_key=${process.env.api_key}`)
    try {
        const response = await axios.get(url)
        const apodData = response.data
        res.render("users/picOfTheDay.ejs", {apodData})
    }catch(err) {
        console.log(err)
    }
})

// Posting the picture url to the database
router.post("/", async (req, res) => {
    try {
        const image = await db.image.create({
            userId: res.locals.user.id,
            url: req.body.url
        })
        res.redirect("/users/profile")

    }catch (err) {
        console.log(err)
    }
    console.log(req.body)
})




module.exports = router
