const router = require('express').Router()
const auth = require('../middleware/auth.middleware')
const postAuth = require('../middleware/post.middleware')
const postController = require('../controllers/post.controller')

router.post('/add', auth, postController.add)

router.get('/allPosts', postController.showAllPosts)

router.get('/singlePost/:id', postController.showSinglePost)

router.get('/myPosts', auth, postController.showMyPosts)

router.patch('/update/:id', auth, postAuth, postController.update)

router.delete('/delete/:id', auth, postAuth, postController.delete)

module.exports = router
