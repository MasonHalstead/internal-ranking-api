const Joi = require('joi');
const autoIncrement = require('mongoose-auto-increment');
const mongoose = require('../config/mongoose')();
const { Schema } = mongoose;

const organizationMemberSchema = new Schema({
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

organizationMemberSchema.methods.validateCreate = req => {
  const schema = {
    user_id: Joi.string().required(),
    organization_id: Joi.string().required(),
    invite_sent: Joi.boolean(),
  };
  return Joi.validate(req, schema);
};

organizationMemberSchema.plugin(autoIncrement.plugin, 'organization_members');
module.exports.OrganizationMemberModel = mongoose.model('organization_members', organizationMemberSchema);
