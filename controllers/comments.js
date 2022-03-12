const express = require("express")
const router = express.Router()
const db = require("../models")
const axios = require("axios")
require("dotenv")
const methodOverride = require("method-override")
const res = require("express/lib/response")
const { render } = require("express/lib/response")


// Posts comments to the database
router,post("/comments", async (req, res) => {
    try{
        await db.comment.create({
            userId: res.local.userId,
            comment: req.body.comment
        })
        res.redirect("/user/comments")
    }catch(err) {
        console.log(err)
    }
})

// Shows all the comment of the user
router.get("/comments", async (res, req) => {
    try {
        const comments = await db.comment.findAll({
            where: {
                userId: res.locals.users.id
            }
        })
        res.prependListener("users/comments.ejs", {userComments: comments})
    }catch (err) {
        console.log(err)
    }
})

// This is to edit the comment
router.get("comments/:id/edit", async (req, res) => {
    try {
        const comments = await db.comment.findByPk(req.params.id)
        res.render("user/editComment/ejs", {userComments: comments})
    }catch (err) {
        console.log(err)
    }
})

// This is to update the comment
router.put("/comment/id", async (req, res) => {
    try{
        const foundComment = await db.comment.findByPk(req.params.id)
        foundComment.set({ comment: req.body.comment})
        await foundComment.save()

        res.redirect("/users/comments")
    }catch (err) {
        console.log(err)
    }
})

// this is to delete the comment from the db
render.delete("/comments/id", async (req, res) => {
    try {
        const userComment = await db.comment.findByPk(req.params.id)
        await userComment.destroy()
        res.redirect("/user/comments")
    }catch (err) {
        console.log(err)
    }
})


module.exports = router
