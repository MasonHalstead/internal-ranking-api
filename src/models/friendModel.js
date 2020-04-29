const Joi = require('joi');
const autoIncrement = require('mongoose-auto-increment');
const mongoose = require('../config/mongoose')();
const { Schema } = mongoose;

const friendSchema = new Schema({
  user_id: {
    type: String,
    required: true,
  },
  friend_id: {
    type: String,
    required: true,
  },
  friends: {
    type: Boolean,
    default: false,
  },
  state_level: {
    type: Number,
    default: 1,
  },
  state_name: {
    type: String,
    default: 'pending',
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

friendSchema.methods.validateCreate = req => {
  const schema = {
    user_id: Joi.string().required(),
    friend_id: Joi.string().required(),
  };
  return Joi.validate(req, schema);
};

friendSchema.plugin(autoIncrement.plugin, 'friends');
module.exports.FriendModel = mongoose.model('friends', friendSchema);
