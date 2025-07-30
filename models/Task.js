const { model, Schema } = require('mongoose')

const taskSchema = new Schema({
    content: String,
    dueAt: {
        type: Date,
        default: Date.now
    },
    completed: {
        type:Boolean,
        default:false
    },
    list: {
        type: Schema.Types.ObjectId,
        ref: 'List',
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

const Task = model('Task', taskSchema)
module.exports = Task