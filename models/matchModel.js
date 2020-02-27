const Joi = require('joi');
const autoIncrement = require('mongoose-auto-increment');
const mongoose = require('../config/mongoose')();
const { Schema } = mongoose;

const matchSchema = new Schema({
  game_id: {
    type: String,
    required: true,
  },
  organization_id: {
    type: String,
    required: true,
  },
  team_id: {
    type: String,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

matchSchema.methods.validateCreate = req => {
  const schema = {
    game_id: Joi.string().required(),
    organization_id: Joi.string().required(),
    team_id: Joi.string().required(),
  };
  return Joi.validate(req, schema);
};

matchSchema.plugin(autoIncrement.plugin, 'matches');
module.exports.MatchModel = mongoose.model('matches', matchSchema);
