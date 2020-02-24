const { StateTypeModel } = require('../models/StateTypeModel');
const state_types = require('../data/state_types.json');

const stateTypeService = {
  async insertAll() {
    try {
      await StateTypeModel.collection.drop();
      await StateTypeModel.insertMany(state_types);
    } catch (err) {
      console.log(err);
    }
  },
  async getAll() {
    return StateTypeModel.find();
  },
};

module.exports = stateTypeService;
