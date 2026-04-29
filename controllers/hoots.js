const router = require('express').Router()
const verifyJwt = require('../middleware/verify-jwt')
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
router.post('/hoots/:hootId/comments', async (req, res) => {

})

module.exports = router