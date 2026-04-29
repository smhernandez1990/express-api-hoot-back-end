const router = require('express').Router()
const Hoot = require('../models/hoot')


//Create
router.post('/hoots', async (req, res) => {

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
    try {
        const hoot = await Hoot.findById(req.params.hootId)
        if(!hoot.author.equals(req.user._id)) {
            return res.status(403).send('You\'re not allowed to do that!')
        }
        const deletedHoot = await Hoot.findByIdAndDelete(req.params.hootId)
        res.status(200).json(deletedHoot)
    } catch (error) {
        res.status(500).json({ err: err.message })
    }
})

//Create Comment
router.post('/hoots/:hootId/comments', async (req, res) => {

})
