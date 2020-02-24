const Joi = require('joi');
const autoIncrement = require('mongoose-auto-increment');
const mongoose = require('../config/mongoose')();
const { Schema } = mongoose;

const organizationSchema = new Schema({
  organization_name: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  user_id: {
    type: String,
    required: true,
  },
  organization_code: {
    type: String,
    required: true,
  },
  organization_ranking: {
    type: Boolean,
    required: true,
  },
  telephone: {
    type: Number,
    default: null,
  },
  email_address: {
    type: String,
    required: true,
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
  created_at: {
    type: Date,
    default: Date.now,
  },
});

organizationSchema.methods.validateCreate = req => {
  const schema = {
    organization_name: Joi.string().required(),
    user_id: Joi.string().required(),
    telephone: Joi.string(),
    email_address: Joi.string(),
    image: Joi.string().required(),
  };
  return Joi.validate(req, schema);
};

organizationSchema.methods.validateUpdate = req => {
  const schema = {
    organization_name: Joi.string().required(),
    user_id: Joi.string().required(),
    telephone: Joi.string(),
    email_address: Joi.string(),
    image: Joi.string().required(),
  };
  return Joi.validate(req, schema);
};

organizationSchema.plugin(autoIncrement.plugin, 'organizations');
module.exports.OrganizationModel = mongoose.model('organizations', organizationSchema);
