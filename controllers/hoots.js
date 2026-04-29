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
router.put('/hoots/:hootId', async (req, res) => {

})

//Delete
router.delete('/hoots/:hootId', async (req, res) => {

})

//Create Comment
router.post('/hoots/:hootId/comments', async (req, res) => {

})
