const autoIncrement = require('mongoose-auto-increment');
const mongoose = require('../config/mongoose')();
const { Schema } = mongoose;

const userTypeSchema = new Schema({
  user_type: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  user_level: {
    type: Number,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

userTypeSchema.plugin(autoIncrement.plugin, 'user_types');
module.exports.UserTypeModel = mongoose.model('user_types', userTypeSchema);
