const router = require('express').Router()

const {User, Blog} = require('../models')

router.get('/', async (req, res, next) => {
    const users = await User.findAll({
        include: [{
            model: Blog,
            attributes: {exclude: ['userId']}
        }]
    })
    return res.json(users)
})

router.get('/:username', async (req, res, next) => {
    const readingsWhere = {}

    if (req.query.read === "true") {
        readingsWhere.read = true
    }
    if (req.query.read === "false") {
        readingsWhere.read = false
    }
    const user = await User.findOne({
        where: {username: req.params.username},
        include: [{
            model: Blog,
            attributes: {exclude: ['userId']}
        }, {
            model: Blog,
            as: 'readings',
            through: {
                where: readingsWhere,
                attributes: ["id","read"]
            },

        }]
    })

    return res.json(user)
})


router.post('/', async (req, res, next) => {
    try {
        const user = await User.create(req.body)
        return res.json(user)
    } catch (error) {
        next(error)
    }
})

router.put('/:username', async (req, res, next) => {
    const user = await User.findOne({where: {username: req.params.username}})
    if (user) {
        try {
            user.username = req.body.username
            await user.save()
            res.json(user)
        } catch (error) {
            next(error)
        }
    } else {
        next(new Error("User not found"))
    }
})

module.exports = router