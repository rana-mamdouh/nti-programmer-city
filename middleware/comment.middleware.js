const commentModel = require('../database/models/comment.model')

const commentAuth = async (req, res, next) => {
    try {
        const comment = await commentModel.findById(req.params.id)

        if (comment.userId != req.user.id)
            throw new Error('Not authorized user!')

            next()
    } catch (error) {
        res.status(500).send({
            apiStatus: false,
            error: error.message,
            message: 'Unauthorized user'
        })
    }
}

module.exports = commentAuth