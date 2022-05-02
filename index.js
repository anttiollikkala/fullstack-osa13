const express = require('express')
const app = express()

const { PORT } = require('./util/config')
const { connectToDatabase } = require('./util/db')

const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/user')
const loginRouter = require('./controllers/login')
const logoutRouter = require('./controllers/logout')
const authorRouter = require('./controllers/authors')
const readingListRouter = require('./controllers/readinglist')

app.use(express.json())

app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use('/api/logout', logoutRouter)
app.use('/api/authors', authorRouter)
app.use('/api/readinglists', readingListRouter)

const start = async () => {
    await connectToDatabase()
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`)
    })
}

const errorHandler = (error, request, response, next) => {
    if (error.name === "Blog not found")
        return response.status(404).json({ error: 'Blog not found' })
    else if (error.name === "SequelizeValidationError") {
        return response.status(400).json({
            error: error.errors.map(e => e.message)
        })
    }
    next(error)
}

// this has to be the last loaded middleware.
app.use(errorHandler)

start()