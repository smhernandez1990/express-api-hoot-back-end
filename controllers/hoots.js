const router = require('express').Router()
const verifyJwt = require('../middleware/verify-jwt')
const Hoot = require("../models/hoot");

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
router.put('/hoots/:hootId', verifyJwt, async (req, res) => {
    try {
        const hoot = await Hoot.findbyId(req.params.hootId)
        if(!hoot.author.equals(req.user._id)) {
            return res.status(403).send('You\'re not allowed to do that!')
        }
        const updatedHoot = await Hoot.findByIdAndUpdate(
            req.params.hootId,
            req.body,
            { new: true}
        )
        updatedHoot._doc.author = req.user
        res.status(200).json(updatedHoot)
    } catch (error) {
        res.status(500).json({ err: err.message })
    }
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

module.exports = router