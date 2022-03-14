const express = require("express")
const router = express.Router()
const db = require("../models")
const axios = require("axios")
require("dotenv")
const methodOverride = require("method-override")


// Posts comments to the database
router.post("/", async (req, res) => {
    try{
        await db.comment.create({
            userId: res.locals.user.id,
            comment: req.body.comment
        })
        res.redirect("/images")
    }catch(err) {
        console.log(err)
    }
})

// Shows all the comment of the user
router.get("/", async (req, res) => {
    console.log(res.locals)
    try {
        const comments = await db.comment.findAll({
            where: {
                userId: res.locals.user.id
            }
        })
        res.render("users/comments.ejs", {userComments: comments})
    }catch (err) {
        console.log(err)
    }
})

// This is to edit the comment
router.get("/:id/edit", async (req, res) => {
    try {
        const comments = await db.comment.findByPk(req.params.id)
        res.render("users/editComment.ejs", {userComments: comments})
    }catch (err) {
        console.log(err)
    }
})

// This is to update the comment
router.put("/:id", async (req, res) => {
    try{
        const foundComment = await db.comment.findByPk(req.params.id)
        foundComment.set({ comment: req.body.comment})
        await foundComment.save()

        res.redirect("/comments")
    }catch (err) {
        console.log(err)
    }
})

// this is to delete the comment from the db
router.delete("/:id", async (req, res) => {
    try {
        const userComment = await db.comment.findByPk(req.params.id)
        await userComment.destroy()
        res.redirect("/comments")
    }catch (err) {
        console.log(err)
    }
})


module.exports = router
