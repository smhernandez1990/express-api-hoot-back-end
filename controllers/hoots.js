const router = require('express').Router()
const express = require('express')
const Hoot = require('../models/hoot')
const verifyJwt = require("./middleware/verify-jwt");

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
router.get('/', verifyJwt, async (req, res) => {
  
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
router.delete('/:hootId', async (req, res) => {

})

//Create Comment
router.post('/:hootId/comments', async (req, res) => {

})

module.exports = router