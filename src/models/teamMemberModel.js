const Joi = require('joi');
const autoIncrement = require('mongoose-auto-increment');
const mongoose = require('../config/mongoose')();
const { Schema } = mongoose;

const teamMemberSchema = new Schema({
  team_id: {
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
  },
  invite_sent: {
    type: Boolean,
    default: false,
  },
  invite_approved: {
    type: Boolean,
    default: false,
  },
  state_level: {
    type: Number,
    default: 3,
  },
  state_name: {
    type: String,
    default: 'active',
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

teamMemberSchema.methods.validateCreate = req => {
  const schema = {
    team_id: Joi.string().required(),
    user_id: Joi.string().required(),
    organization_id: Joi.string().required(),
    invite_sent: Joi.boolean(),
  };
  return Joi.validate(req, schema);
};

teamMemberSchema.plugin(autoIncrement.plugin, 'team_members');
module.exports.TeamMemberModel = mongoose.model('team_members', teamMemberSchema);
