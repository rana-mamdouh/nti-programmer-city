const jwt = require('jsonwebtoken')
const userModel = require('../database/models/user.model')

const auth = async (req, res, next) => {

    try {
        const token = req.header('Authorization')
        const decodedToken = jwt.verify(token, process.env.JWTKEY)

        const user = await userModel.findOne({
            _id: decodedToken._id,
            'tokens.token': token
        })

        if (!user)
            throw new Error('User not found!')

        req.user = user
        req.token = token
        next()
    } catch (error) {
        res.status(500).send({
            apiStatus: false,
            error: error.message,
            message: 'Unauthorized user'
        })
    }
}

module.exports = auth