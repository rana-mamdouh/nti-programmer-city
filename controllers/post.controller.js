const postModel = require('../database/models/post.model')

class Post {
    static add = async (req, res) => {
        try {
            const post = new postModel({
                ...req.body,
                userId: req.user._id
            })
            await post.save()

            res.status(200).send({
                apiStatus: true,
                data: post,
                message: 'Post added successfully!'
            })
        } catch (error) {
            res.status(500).send({
                apiStatus: false,
                error,
                message: error.message
            })
        }
    }

    static showAllPosts = async (req, res) => {
        try {
            const posts = await postModel.find()

            res.status(200).send({
                apiStatus: true,
                data: posts,
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

    static showSinglePost = async (req, res) => {
        try {
            const post = await postModel.findById(req.params.id)

            res.status(200).send({
                apiStatus: true,
                data: post,
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

    static showMyPosts = async (req, res) => {
        try {
            await req.user.populate('myPosts')
            res.status(200).send({
                apiStatus: true,
                data: req.user.myPosts,
                message: 'Posts fetched successfully!'
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
            const post = await postModel.findByIdAndUpdate(
                req.params.id,
                req.body,
                { runValidators: true }
            )
            res.status(200).send({
                apiStatus: true,
                data: post,
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

    static delete = async (req, res) => {
        try {
            const post = await postModel.findByIdAndDelete(req.params.id)

            res.status(200).send({
                apiStatus: true,
                data: post,
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
}

module.exports = Post
