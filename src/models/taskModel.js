const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const taskModel = new Schema({
    content: {
      type: String,
      lowercase: false,
      required: [true, "can't be blank"]
    },
    priority: {
      type: Number,
      min: [0, "can't be lower than 0"],
      max: [3, "can't be upper than 3"],
      default: 0
    },
    isOver: {
        type: Boolean,
        default: false
      }
});
module.exports = mongoose.model('tasks', taskModel)