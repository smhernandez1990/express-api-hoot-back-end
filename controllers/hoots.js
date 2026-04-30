const express = require('express')
const verifyJwt = require("../middleware/verify-jwt");
const Hoot = require("../models/hoot");
const router = require('express').Router()

//Create
router.post('/', verifyJwt, async (req, res) => {
 try {
  req.user._id === req.body.author;
  const hoot = await Hoot.create(req.body);
  hoot._doc.author = req.user;
  res.status(201).json(hoot);
 } catch (err) {
  res.status(500).json({ error: error.message})
 }
})

//Index
router.get('/hoots', async (req, res) => {

})

//Show
router.get('/hoots/:hootId', async (req, res) => {

})





















//Update
router.put('/hoots/:hootId', async (req, res) => {

})

//Delete
router.delete('/hoots/:hootId', async (req, res) => {

})

//Create Comment
router.post('/hoots/:hootId/comments', verifyJwt, async (req, res) => {
    try {
        req.body.author = req.user._id
        const hoot = await Hoot.findById(req.params.hootId)
        hoot.comments.push(req.body)
        await hoot.save()
        const newComment = hoot.comments[hoot.comments.length - 1]
        newComment._doc.author = req.user
        res.status(201).json(newComment)
    } catch (error) {
        res.status(500).json({ err: err.message})
    }
})



module.exports = router;
