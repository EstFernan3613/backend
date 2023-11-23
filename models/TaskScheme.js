const { Schema, model } = require('mongoose');

const TaskScheme = Schema({
    title:{
        type: String,
        require: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
    },
}, {
    toJSON: {
        virtuals: true
    },
    toObject: {
        virtuals: true
    }
});

TaskScheme.methods.toJSON = function() {
    const { __v, _id, ...task } = this.toObject();
    task.uid = _id;
    return object;
}

module.exports = model('Task', TaskScheme);