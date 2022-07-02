const postModel = require('../database/models/post.model')
const commentModel = require('../database/models/comment.model')
const userModel = require('../database/models/user.model')

class Comment {
    static add = async (req, res) => {
        try {
            const comment = new commentModel({
                ...req.body,
                userId: req.user._id,
                userName: req.user.name,
                postId: req.params.id
            })
            await comment.save()

            res.status(200).send({
                apiStatus: true,
                data: comment,
                message: 'Comment added successfully!'
            })
        } catch (error) {
            res.status(500).send({
                apiStatus: false,
                error,
                message: error.message
            })
        }
    }

    static showAllComments = async (req, res) => {
        try {
            const post = await postModel.findById(req.params.id)

            await post.populate('comments')

            res.status(200).send({
                apiStatus: true,
                data: post.comments,
                message: 'Comments fetched successfully!'
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
            const comment = await commentModel.findByIdAndUpdate(
                req.params.id,
                req.body,
                { runValidators: true }
            )
            res.status(200).send({
                apiStatus: true,
                data: comment,
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
            const comment = await commentModel.findByIdAndDelete(req.params.id)

            res.status(200).send({
                apiStatus: true,
                data: comment,
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
module.exports = Comment
