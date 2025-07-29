const { model, Schema } = require('mongoose')

const taskSchema = new Schema({
    content: String,
    dueAt: {
        type: Date,
        default: Date.now
    },
    completed: Boolean,
    list: [{
        type: Schema.Types.ObjectId,
        ref: 'List',
    }]
})

const Task = model('Task', taskSchema)
module.exports = Task