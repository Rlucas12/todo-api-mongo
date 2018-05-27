const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userModel = new Schema({
  firstname: {
    type: String,
    lowercase: true,
    required: [true, "can't be blank"]
  },
  lastname: {
    type: String,
    lowercase: true,
    required: [true, "can't be blank"]
  },
  email: {
      type: String,
      lowercase: true,
      unique: true,
      required: [true, "can't be blank"],
      match: [/\S+@\S+\.\S+/, 'is invalid']
  },
  projects: [{ type: Schema.Types.ObjectId, ref: 'Project' }],
  labels: [{ type: Schema.Types.ObjectId, ref: 'Label' }]
});
module.exports = mongoose.model('User', userModel)