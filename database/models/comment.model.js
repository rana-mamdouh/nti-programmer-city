const mongoose = require('mongoose')

const commentSchema = mongoose.Schema({

    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
        required: true
    },

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    userName: {
        firstName: {
            type: String,
            trim: true,
            required: true
        },
        lastName: {
            type: String,
            trim: true,
            required: true
        }
    },

    content: {
        type: String,
        trim: true,
        required: true
    },

    image: {
        type: String
    },
},
    {
        timestamps: true
    })



const Comment = mongoose.model('Comment', commentSchema)

module.exports = Comment