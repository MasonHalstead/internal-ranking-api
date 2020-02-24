const bcrypt = require('bcrypt');
const { UserModel } = require('../models/userModel');

const UserService = {
  async register(payload) {
    const user = await new UserModel(payload);
    await user.validateRegistration(payload);
    user.password = await user.hashPassword(user.password);
    await UserModel.create(user);
    return user.generateToken(user);
  },
  async login(payload) {
    const user = await new UserModel();
    await user.validateLogin(payload);
    const found_user = await UserModel.findOne({
      email_address: payload.email_address,
    });
    if (found_user) {
      const valid_password = await bcrypt.compare(payload.password, found_user.password);
      if (valid_password) {
        return user.generateToken(found_user);
      }
    }
    throw new Error('Invalid email address or password.');
  },
  async me(payload) {
    const user = await UserModel.findById(payload._id).select('-password');
    return user;
  },
  async getById({ _id }) {
    return UserModel.findById(_id);
  },
  async deleteById({ _id }) {
    return UserModel.deleteById(_id);
  },
};

module.exports = UserService;
