const router = require('express').Router()

const Session = require('../models/session')
const {sessionExtractor} = require("../middleware");

router.delete('/', sessionExtractor, async (req, res) => {
    await Session.destroy({where: {user_id: req.token.id, session_id: req.token.sessionId }})
})

module.exports = router