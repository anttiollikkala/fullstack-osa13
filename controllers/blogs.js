const router = require('express').Router()
const { Blog } = require('../models')
const User = require("../models/user");
const {Op} = require("sequelize");
const {sessionExtractor} = require("../middleware");

router.get('/', async (req, res) => {
   const where = {}

    if (req.query.search) {
        where[Op.or] = {
            title: {
                [Op.iLike]: `%${req.query.search}%`
            },
            author: {
                [Op.iLike]: `%${req.query.search}%`
            }
        }
    }

    const blogs = await Blog.findAll({
        attributes: { exclude: ['userId'] },
        include: {
            model: User,
        },
        order: [['likes', 'DESC']],
        where
    })
    return res.json(blogs)
})

router.post('/', sessionExtractor, async (req, res, next) => {
    try {
        const user = await User.findByPk(req.token.id)
        const blog = await Blog.create({...req.body, userId: user.id})
        return res.json(blog)
    } catch(error) {
        next(error)
    }
})

router.put('/:id', async (req, res,next) => {
    const blog = await Blog.findByPk(req.params.id)
    if (blog) {
        blog.likes = req.body.likes
        await blog.save()
        res.json(blog)
    } else {
        next(new Error("Blog not found"))
    }
})

router.delete('/:id', sessionExtractor, async (req, res) => {
    const count = await Blog.destroy({ where: { id: req.params.id, userId: req.token.id } });
    if (count >= 1) return res.status(200).end()
    else return res.status(404).end()
})

module.exports = router