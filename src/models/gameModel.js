const Joi = require('joi');
const autoIncrement = require('mongoose-auto-increment');
const mongoose = require('../config/mongoose')();
const { Schema } = mongoose;

const gameSchema = new Schema({
  user_id: {
    type: String,
    required: true,
  },
  organization_id: {
    type: String,
    required: true,
  },
  game_name: {
    type: String,
    required: true,
  },
  game_description: {
    type: String,
  },
  max_players: {
    type: Number,
    required: true,
  },
  image: {
    data: Buffer,
    contentType: String,
  },
  state_level: {
    type: Number,
    default: 3,
  },
  state_name: {
    type: String,
    default: 'active',
  },
  team_event: {
    type: Boolean,
    default: false,
  },
  game_type_id: {
    type: Number,
    default: 1,
  },
  game_type: {
    type: String,
    default: 'classic',
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

gameSchema.methods.validateCreate = req => {
  const schema = {
    user_id: Joi.string().required(),
    organization_id: Joi.string().required(),
    game_name: Joi.string().required(),
    game_description: Joi.string(),
    max_players: Joi.number().required(),
    team_event: Joi.boolean().required(),
    game_type: Joi.string().required(),
    game_type_id: Joi.number().required(),
    image: Joi.string(),
    invite_sent: Joi.boolean(),
  };
  return Joi.validate(req, schema);
};

gameSchema.plugin(autoIncrement.plugin, 'games');
module.exports.gameModel = mongoose.model('games', gameSchema);
