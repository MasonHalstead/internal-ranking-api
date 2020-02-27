const user_types = require('../data/user_types.json');
const { UserTypeModel } = require('../models/userTypeModel');

const userTypeService = {
  async insertAll() {
    try {
      await UserTypeModel.collection.drop();
      await UserTypeModel.insertMany(user_types);
    } catch (err) {
      console.log(err);
    }
  },
  async getAll() {
    return UserTypeModel.find();
  },
};

module.exports = userTypeService;
