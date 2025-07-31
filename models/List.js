const { model, Schema } = require('mongoose')

const listSchema = new Schema({
    name: {
        type: String,
        required: [true, "List name is required"],
    },
    tasks: [{
        type: Schema.Types.ObjectId,
        ref: 'Task'
    }],
    user:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
})

const List = model('List', listSchema)
module.exports = List