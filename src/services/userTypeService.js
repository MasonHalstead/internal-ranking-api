const { UserTypeModel } = require('../models/UserTypeModel');
const user_types = require('../data/user_types.json');

const UserTypeService = {
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

module.exports = UserTypeService;
