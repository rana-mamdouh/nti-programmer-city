const postModel = require('../database/models/post.model')

const postAuth = async (req, res, next) => {
    try {
        const post = await postModel.findById(req.params.id)

        if (post.userId != req.user.id)
            throw new Error('Not authorized user!')

        req.post = post
        next()
    } catch (error) {
        res.status(500).send({
            apiStatus: false,
            error: error.message,
            message: 'Unauthorized user'
        })
    }
}

module.exports = postAuth