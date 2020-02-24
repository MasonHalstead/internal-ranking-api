const autoIncrement = require('mongoose-auto-increment');
const mongoose = require('../config/mongoose')();
const { Schema } = mongoose;

const stateTypeSchema = new Schema({
  state_type: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  state_level: {
    type: Number,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

stateTypeSchema.plugin(autoIncrement.plugin, 'state_types');
module.exports.StateTypeModel = mongoose.model('state_types', stateTypeSchema);
