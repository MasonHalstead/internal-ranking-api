const Joi = require('joi');
const autoIncrement = require('mongoose-auto-increment');
const mongoose = require('../config/mongoose')();
const { Schema } = mongoose;

const teamSchema = new Schema({
  team_name: {
    type: String,
    required: true,
  },
  user_id: {
    type: String,
    required: true,
  },
  organization_id: {
    type: String,
    required: true,
    index: true,
  },
  image: {
    type: String,
    data: Buffer,
  },
  state_level: {
    type: Number,
    default: 3,
  },
  state_name: {
    type: String,
    default: 'active',
  },
  ranking: {
    type: Number,
    default: null,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

teamSchema.methods.validateCreate = req => {
  const schema = {
    team_name: Joi.string().required(),
    organization_id: Joi.string().required(),
    user_id: Joi.string().required(),
    image: Joi.string().required(),
  };
  return Joi.validate(req, schema);
};

teamSchema.plugin(autoIncrement.plugin, 'teams');
module.exports.TeamModel = mongoose.model('teams', teamSchema);
