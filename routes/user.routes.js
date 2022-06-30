const router = require('express').Router()
const userController = require('../controllers/user.controller')
const auth = require('../middleware/auth.middleware')
const upload = require("../middleware/uploadFile.middleware")

router.post('/register', userController.register)

router.post('/login', userController.login)

router.get('/show', auth, userController.show)

router.get('/showUser/:id', userController.showById)

router.patch('/update', auth, userController.update)

router.patch('/changePassword', auth, userController.changePassword)

router.patch('/uploadPhoto', auth, upload.single('profile'), userController.uploadPhoto)

router.get('/sendPhoto/:img', userController.sendPhoto);

router.delete('/delete', auth, userController.delete)

router.get('/logout', auth, userController.logout)

router.get('/showAll', userController.showAll)

router.get('/activate/:id', userController.activate)

router.get('/block/:id', userController.block)

module.exports = router