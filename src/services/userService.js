const bcrypt = require('bcrypt');
const { UserModel } = require('../models/userModel');

const userService = {
  async register(payload) {
    const user = await new UserModel(payload);
    await user.validateRegistration(payload);
    user.password = await user.hashPassword(user.password);
    user.avatar = await user.randomizeAvatar();
    const new_user = await UserModel.create(user);
    return user.generateToken(new_user);
  },
  async update(_id, payload) {
    const user = await new UserModel();
    await user.validateUpdate(payload);
    const updated_user = await UserModel.findByIdAndUpdate({ _id }, { ...payload, updated_at: new Date() }, { new: true });
    return updated_user;
  },
  async getToken(payload) {
    const user = await new UserModel();
    const found_user = await this.getById(payload);
    return user.generateToken(found_user);
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

module.exports = userService;
