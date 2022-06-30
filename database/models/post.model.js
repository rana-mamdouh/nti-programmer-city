const mongoose = require('mongoose')

const postSchema = mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    title: {
        type: String,
        trim: true,
        required: true
    },

    content: {
        type: String,
        trim: true,
        required: true
    }
},
    {
        timestamps: true
    })

postSchema.methods.toJSON = function () {
    const post = this.toObject()
    delete post.__v
    return post
}

postSchema.virtual("comments", {
    ref: 'Comment',
    localField: '_id',
    foreignField: 'postId'
})

const Post = mongoose.model('Post', postSchema)

module.exports = Post