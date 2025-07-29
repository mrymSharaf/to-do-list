const { model, Schema } = require('mongoose')

const listSchema = new Schema({
    name: {
        type: String,
        required: [true, "List name is required"],
    },
    task: [{
        type: Schema.Types.ObjectId,
        ref: 'Task'
    }]
})

const List = model('List', listSchema)
module.exports = List