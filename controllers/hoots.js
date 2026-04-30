const router = require('router')
const express = require('express')
const Hoot = require('../models/hoot')
const verifyJwt = require('./verify-jwt')


//Create
router.post('/', async (req, res) => {

})

//Index
router.get('/', verifyJwt, async (req, res) => {
try {
  const hoots = await Hoot.find({})
    .populate("author")
    .sort({ createdAt: "desc" });
  res.status(200).json(hoots);
} catch (err) {
  res.status(500).json({ err: err.message });
}
})

//Show
router.get('/:hootId', async (req, res) => {

})





















//Update
router.put('/:hootId', verifyJwt, async (req, res) => {
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
router.delete('/:hootId', async (req, res) => {

})

//Create Comment
router.post('/:hootId/comments', async (req, res) => {

})

module.exports = router