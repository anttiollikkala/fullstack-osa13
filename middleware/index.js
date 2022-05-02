const jwt = require("jsonwebtoken");
const {SECRET} = require("../util/config");
const Session = require('../models/session')

const sessionExtractor = async (req, res, next) => {
    const authorization = req.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        try {
            req.token = jwt.verify(authorization.substring(7), SECRET)
            const session = await Session.findOne({where: {user_id: req.token.id, sessionId: req.token.sessionId}})
            if (!session) res.status(401).json({error: 'token invalid'}).end()
            else next()
        } catch {
            res.status(401).json({error: 'token invalid'}).end()
        }
    } else {
        res.status(401).json({error: 'token missing'}).end()
    }
}

module.exports = { sessionExtractor }