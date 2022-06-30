const mongoose = require('mongoose')
const validator = require('validator')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = mongoose.Schema({
    name: {
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

    email: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) throw new Error('Invalid Email')
        }
    },

    birthdate: {
        type: Date,
        required: true
    },

    age: {
        type: Number
    },

    password: {
        type: String,
        trim: true,
        required: true,
        match: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
    },

    status: {
        type: String,
        enum: ['active', 'inactive', 'blocked'],
        default: 'inactive'
    },

    type: {
        type: String,
        enum: ['user', 'admin', 'super']
    },

    image: {
        type: String
    },

    tokens: [
        {
            token: {
                type: String,
                required: true
            }
        }
    ]
},
    {
        timestamps: true
    })

userSchema.methods.toJSON = function () {
    const user = this.toObject()
    delete user.__v
    delete user.tokens
    delete user.password
    return user
}

userSchema.pre('save', async function () {
    if (this.isModified('password'))
        this.password = await bcryptjs.hash(this.password, 12)

    if (this.isModified('birthdate')) {
        var ageDiffernceMs = Date.now() - this.birthdate.getTime()
        var ageDate = new Date(ageDiffernceMs)
        this.age = Math.abs(ageDate.getUTCFullYear() - 1970)
    }

})

userSchema.statics.login = async (email, password) => {
    const user = await User.findOne({ email })
    if (!user)
        throw new Error('Invalid email!')

    const isValidPassword = await bcryptjs.compare(password, user.password)

    if (!isValidPassword)
        throw new Error('Invalid password!')

    if (user.status == 'blocked')
        throw new Error('User is blocked')

    return user
}

userSchema.methods.generateToken = async function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWTKEY)

    this.tokens.push({ token })

    await this.save()

    return token
}

userSchema.virtual("myPosts",{
    ref:'Post',
    localField: '_id',
    foreignField:'userId'
})

const User = mongoose.model('User', userSchema)

module.exports = User