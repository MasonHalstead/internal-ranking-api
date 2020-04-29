const { FriendModel } = require('../models/friendModel');

const teamService = {
  async getAll() {
    return FriendModel.find();
  },
  async deleteById({ _id }) {
    return FriendModel.deleteById(_id);
  },
  async getByUser({ _id }) {
    return FriendModel.find({ user_id: _id });
  },
  async getByFriend({ _id }) {
    return FriendModel.find({ friend_id: _id });
  },
  async create(payload) {
    const friend = await new FriendModel(payload);
    await friend.validateCreate(payload);
    await FriendModel.create(friend);
    return friend;
  },
};

module.exports = teamService;
