const Joi = require('joi');
const autoIncrement = require('mongoose-auto-increment');
const mongoose = require('../config/mongoose')();
const { Schema } = mongoose;

const rankingSchema = new Schema({
  user_id: {
    type: String,
    required: true,
  },
  organization_id: {
    type: String,
    required: true,
  },
  match_id: {
    type: String,
    required: true,
  },
  team_id: {
    type: String,
    required: true,
  },
  game_id: {
    type: String,
    required: true,
  },
  current_ranking: {
    type: Number,
    required: true,
  },
  previous_ranking: {
    type: Number,
    required: true,
    default: 0,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

rankingSchema.methods.validateCreate = req => {
  const schema = {
    user_id: Joi.string().required(),
    organization_id: Joi.string().required(),
    match_id: Joi.string().required(),
    team_id: Joi.string().required(),
    game_id: Joi.string().required(),
    current_ranking: Joi.number().required(),
    previous_ranking: Joi.number().required(),
  };
  return Joi.validate(req, schema);
};

rankingSchema.plugin(autoIncrement.plugin, 'rankings');
module.exports.rankingModel = mongoose.model('rankings', rankingSchema);
