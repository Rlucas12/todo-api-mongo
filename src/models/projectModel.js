const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const projectModel = new Schema({
  name: {
    type: String,
    lowercase: false,
    required: [true, "can't be blank"]
  },
  color: {
    type: String,
    lowercase: true,
    required: [true, "can't be blank"]
  },
  isArchived: {
    type: Boolean,
    default: false
  },
  user: { 
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true 
  }
});
module.exports = mongoose.model('Project', projectModel)
