const Joi = require('joi');
const autoIncrement = require('mongoose-auto-increment');
const avatars = require('../data/avatars.json');
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
    type: Number,
    required: true,
  },
  email_address: {
    type: String,
    required: true,
  },
  state_level: {
    type: Number,
    default: 3,
  },
  state_name: {
    type: String,
    default: 'active',
  },
  avatar: {
    type: String,
    default: 'redpanda.svg',
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

organizationSchema.methods.validateCreate = req => {
  const schema = {
    organization_name: Joi.string().required(),
    user_id: Joi.number().required(),
    email_address: Joi.string(),
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

organizationSchema.methods.randomizeAvatar = async () => {
  const max = avatars.length - 1;
  const index = Math.floor(Math.random() * Math.floor(max));
  return avatars[index];
};

organizationSchema.methods.createCode = async () => parseInt(Math.random() * 1000000000, 10);

organizationSchema.plugin(autoIncrement.plugin, 'organizations');
module.exports.OrganizationModel = mongoose.model('organizations', organizationSchema);
