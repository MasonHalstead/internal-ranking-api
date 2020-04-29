const Joi = require('joi');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const autoIncrement = require('mongoose-auto-increment');
const avatars = require('../data/avatars.json');
const mongoose = require('../config/mongoose')();
const { Schema } = mongoose;
const { PRIVATE_KEY } = process.env;

const userSchema = new Schema({
  first_name: {
    type: String,
    default: null,
  },
  last_name: {
    type: String,
    default: null,
  },
  password: {
    type: String,
    required: true,
  },
  password_reset: {
    type: String,
    default: null,
  },
  email_address: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  organization_id: {
    type: Number,
    default: null,
  },
  account_verified: {
    type: Boolean,
    default: false,
  },
  read_terms: {
    type: Boolean,
    default: false,
  },
  admin: {
    type: Boolean,
    default: false,
  },
  read_access: {
    type: Boolean,
    default: false,
  },
  write_access: {
    type: Boolean,
    default: false,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
  avatar: {
    type: String,
    default: 'redpanda.svg',
  },
  user_type: {
    type: String,
    default: 'user',
  },
  user_level: {
    type: Number,
    default: 1,
  },
});

userSchema.methods.hashPassword = async password => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

userSchema.methods.randomizeAvatar = async () => {
  const max = avatars.length - 1;
  const index = Math.floor(Math.random() * Math.floor(max));
  return avatars[index];
};

userSchema.methods.generateToken = user => {
  const token = jwt.sign(
    {
      _id: user._id,
      first_name: user.first_name,
      last_name: user.last_name,
      email_address: user.email_address,
      avatar: user.avatar,
      user_type: user.user_type,
      user_level: user.user_level,
      read_access: user.read_access,
      write_access: user.write_access,
      account_verified: user.account_verified,
    },
    PRIVATE_KEY,
    {
      expiresIn: '7d',
    },
  );
  return token;
};

userSchema.methods.validateRegistration = req => {
  const schema = {
    first_name: Joi.string().allow(''),
    last_name: Joi.string().allow(''),
    password: Joi.string().required(),
    email_address: Joi.string().required(),
    read_terms: Joi.boolean(),
  };
  return Joi.validate(req, schema);
};

userSchema.methods.validateLogin = req => {
  const schema = {
    email_address: Joi.string().required(),
    password: Joi.string().required(),
  };
  return Joi.validate(req, schema);
};

userSchema.methods.validateUpdate = req => {
  const schema = {
    first_name: Joi.string().allow(''),
    last_name: Joi.string().allow(''),
    organization_id: Joi.number(),
    admin: Joi.boolean(),
    write_access: Joi.boolean(),
    read_access: Joi.boolean(),
    avatar: Joi.string(),
  };
  return Joi.validate(req, schema);
};

userSchema.plugin(autoIncrement.plugin, 'users');
module.exports.UserModel = mongoose.model('users', userSchema);
