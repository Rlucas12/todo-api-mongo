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
      }
});
module.exports = mongoose.model('users', userModel)