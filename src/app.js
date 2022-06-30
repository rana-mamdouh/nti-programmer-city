require('../database/connect')
const express = require('express')
const userRouter = require('../routes/user.routes')
const postRouter = require('../routes/post.routes')
const commentRouter = require('../routes/comment.routes')
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(cors())
app.use('/user', userRouter)
app.use('/post', postRouter)
app.use('/comment', commentRouter)

// app.options("",cors())
module.exports = app