const jwt = require('jsonwebtoken')
const router = require('express').Router()

const { SECRET } = require('../util/config')
const User = require('../models/user')
const Session = require('../models/session')

const { v4: uuidv4 } = require('uuid');

router.post('/', async (req, res) => {
    const user = await User.findOne({
        where: {username: req.body.username}
    })
    if (!(user && req.body.password === 'secret')) {
        return res.status(401).json({
            error: 'invalid username or password'
        })
    }
    const tokenPayload = {
        username: user.username,
        id: user.id,
        sessionId: uuidv4()
    }
    const token = jwt.sign(tokenPayload, SECRET)

    await Session.create({userId: tokenPayload.id, sessionId: tokenPayload.sessionId})

    res.status(200)
        .send({ token, username: user.username, name: user.name, token_id: tokenPayload.sessionId })
})

module.exports = router