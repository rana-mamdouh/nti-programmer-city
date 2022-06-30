const router = require('express').Router()
const auth = require('../middleware/auth.middleware')
const postAuth = require('../middleware/post.middleware')
const commentAuth = require('../middleware/comment.middleware')
const commentController = require('../controllers/comment.controller')

router.post('/add/:id', auth, commentController.add)

router.get('/allComments/:id', commentController.showAllComments)

router.patch('/update/:id', auth, commentAuth, commentController.update)

router.delete('/delete/:id', auth, commentAuth, commentController.delete)

module.exports = router