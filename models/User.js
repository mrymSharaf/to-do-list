const { model, Schema } = require('mongoose')

const userSchema = new Schema({
    username: {
        type: String,
        required: [true, "username is required"],
        unique: [true, "username already taken please pick another username"],
        max: 20
    },
    password: {
        type: String,
        required: [true, "password is required"]
    },

    list:[{
        type: Schema.Types.ObjectId,
        ref:'List'
    }]
})

const User = model('User', userSchema)
module.exports = User