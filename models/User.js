const { model, Schema } = require('mongoose')

const userSchema = new Schema({
    username: {
        type: String,
        required: [true, "username is required"],
        unique: [true, "username already taken please pick another username"],
        max: [20, "Username can't exceed 20 characters"]
    },
    password: {
        type: String,
        required: [true, "password is required"]
    },

    lists:[{
        type: Schema.Types.ObjectId,
        ref:'List'
    }],
    tasks:[{
        type: Schema.Types.ObjectId,
        ref:'Task'
    }]
})

const User = model('User', userSchema)
module.exports = User