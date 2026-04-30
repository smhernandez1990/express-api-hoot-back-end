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
router.get('/:hootId', verifyJwt, async (req, res) => {
    try {
        const hoot = await Hoot.findById(req.params.hootId).populate("author");
        res.status(200).json(hoot);
    } catch (err) {
        res.status(500).json({ err: err.message });
    }
});





















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
router.delete("/:hootId", verifyToken, async (req, res) => {
    try {
        const hoot = await Hoot.findById(req.params.hootId);

        if (!hoot.author.equals(req.user._id)) {
            return res.status(403).send("You're not allowed to do that!");
        }

        const deletedHoot = await Hoot.findByIdAndDelete(req.params.hootId);
        res.status(200).json(deletedHoot);
    } catch (err) {
        res.status(500).json({ err: err.message });
    }
});

//Create Comment
router.post('/:hootId/comments', async (req, res) => {

})

module.exports = router