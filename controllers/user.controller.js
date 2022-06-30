const userModel = require('../database/models/user.model')
const fs = require('fs')
const path = require('path')

class User {
    static register = async (req, res) => {
        try {
            const user = new userModel(req.body)
            user.type = 'user'
            await user.save()

            res.status(200).send({
                apiStatus: true,
                data: user,
                message: 'User registered successfully!'
            })

        } catch (error) {
            res.status(500).send({
                apiStatus: false,
                error,
                message: error.message
            })
        }
    }

    static login = async (req, res) => {
        try {
            const user = await userModel.login(req.body.email, req.body.password)
            const token = await user.generateToken()
            res.status(200).send({
                apiStatus: true,
                data: {
                    user,
                    token
                },
                message: 'Logged in successfully!'
            })
        } catch (error) {
            res.status(500).send({
                apiStatus: false,
                error,
                message: error.message
            })
        }
    }

    static show = async (req, res) => {
        try {
            const user = req.user
            if (!user)
                throw new Error('Invalid user')
            res.status(200).send({
                apiStatus: true,
                data: user,
                message: 'Data fetched successfully!'
            })
        } catch (error) {
            res.status(500).send({
                apiStatus: false,
                error,
                message: error.message
            })
        }
    }

    static showById = async (req, res) => {
        try {
            const user = await userModel.findById(req.params.id)

            res.status(200).send({
                apiStatus: true,
                data: user,
                message: 'Data fetched successfully!'
            })
        } catch (error) {
            res.status(500).send({
                apiStatus: false,
                error,
                message: error.message
            })
        }
    }

    static update = async (req, res) => {
        try {
            req.body.updatedAt = Date.now()
            const user = await userModel.findByIdAndUpdate(
                req.user._id,
                req.body,
                { runValidators: true }
            )

            res.status(200).send({
                apiStatus: true,
                data: user,
                message: 'Data updated successfully!'
            })

        } catch (error) {
            res.status(500).send({
                apiStatus: false,
                error,
                message: error.message
            })
        }

    }

    static changePassword = async (req, res) => {
        try {
            req.user.password = req.body.password

            await req.user.save()

            res.status(200).send({
                apiStatus: true,
                data: req.user,
                message: 'Password updated successfully!'
            })
        } catch (error) {
            res.status(500).send({
                apiStatus: false,
                error,
                message: error.message
            })
        }
    }

    static delete = async (req, res) => {
        try {
            const user = await userModel.findByIdAndDelete(req.user._id)

            res.status(200).send({
                apiStatus: true,
                data: user,
                message: 'Data deleted successfully!'
            })

        } catch (error) {
            res.status(500).send({
                apiStatus: false,
                error,
                message: error.message
            })
        }
    }

    static logout = async (req, res) => {
        try {
            req.user.tokens = req.user.tokens.filter(t => t.token != req.token)
            req.user.save()
            res.status(200).send({
                apiStatus: true,
                message: 'Logged out successfully!'
            })
        } catch (error) {
            res.status(500).send({
                apiStatus: false,
                error,
                message: error.message
            })
        }

    }

    static showAll = async (req, res) => {
        try {
            const users = await userModel.find()
            res.status(200).send({
                apiStatus: true,
                data: users,
                message: 'Data fetched successfully!'
            })
        } catch (error) {
            res.status(500).send({
                apiStatus: false,
                error,
                message: error.message
            })
        }
    }

    static activate = async (req, res) => {
        try {
            const user = await userModel.findById(req.params.id)

            user.status = 'active'
            await user.save()

            res.status(200).send({
                apiStatus: true,
                data: req.user,
                message: 'User activated!'
            })
        } catch (error) {
            res.status(500).send({
                apiStatus: false,
                error,
                message: error.message
            })
        }
    }

    static block = async (req, res) => {
        try {
            const user = await userModel.findById(req.params.id)

            user.status = 'blocked'
            await user.save()

            res.status(200).send({
                apiStatus: true,
                data: req.user,
                message: 'User blocked!'
            })
        } catch (error) {
            res.status(500).send({
                apiStatus: false,
                error,
                message: error.message
            })
        }
    }

    static uploadPhoto = async (req, res) => {
        try {
            const oldFile = req.user.image
            req.user.image = req.file.path

            await req.user.save()

            fs.unlinkSync(oldFile)

            await req.user.save()

            res.status(200).send({
                apiStatus: true,
                data: req.user,
                message: 'Image uploaded successfully!!'
            })
        } catch (error) {
            res.status(500).send({
                apiStatus: false,
                error,
                message: error.message
            })
        }
    }

    static sendPhoto = (req, res) => {
        console.log(req.params.img)
        try {
            res.sendFile( `images\\${req.params.img}`, { root: '.' })
        } catch (error) {
            res.status(500).send({
                apiStatus: false,
                error,
                message: error.message
            })
        }
    }
}

module.exports = User