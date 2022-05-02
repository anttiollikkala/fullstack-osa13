const router = require('express').Router()

const { ReadingList } = require('../models')
const {sessionExtractor} = require("../middleware");

router.post("/", async (req, res) => {
    const entry = await ReadingList.create(req.body)
    res.json(entry).end()
})

router.put("/:id", sessionExtractor, async (req, res) => {
    const entry = await ReadingList.findOne( {where: {id: req.params.id, user_id: req.token.id}})
    if (entry) {
        entry.read = req.body.read
        await entry.save()
        res.json(entry).end()
    }
    res.status(401).end()
})


module.exports = router