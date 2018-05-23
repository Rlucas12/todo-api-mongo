const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const labelModel = new Schema({
    name: {
      type: String,
      lowercase: false,
      required: [true, "can't be blank"]
    },
    color: {
      type: String,
      lowercase: true,
      required: [true, "can't be blank"]
    }
});
module.exports = mongoose.model('labels', labelModel)