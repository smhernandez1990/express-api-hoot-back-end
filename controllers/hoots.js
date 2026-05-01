const router = require('express').Router()
const Hoot = require('../models/hoot')
const verifyJwt = require('../middleware/verify-jwt')


//Create
router.post('/', verifyJwt, async (req, res) => {
    try {
        req.user._id === req.body.author;
        const hoot = await Hoot.create(req.body);
        hoot._doc.author = req.user;
        res.status(201).json(hoot);
    } catch (err) {
        res.status(500).json({ error: error.message })
    }
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
router.delete("/:hootId", verifyJwt, async (req, res) => {
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
router.post('/:hootId/comments', verifyJwt, async (req, res) => {
    try {
        req.body.author = req.user._id
        const hoot = await Hoot.findById(req.params.hootId)
        hoot.comments.push(req.body)
        await hoot.save()
        const newComment = hoot.comments[hoot.comments.length - 1]
        newComment._doc.author = req.user
        res.status(201).json(newComment)
    } catch (error) {
        res.status(500).json({ err: err.message })
    }
});

module.exports = router