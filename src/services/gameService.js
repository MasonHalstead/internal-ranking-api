const { GameModel } = require('../models/GameModel');

const GameService = {
  async getAll() {
    return GameModel.find();
  },
  async getByOrganization({ organization_id }) {
    return GameModel.find({ organization_id });
  },
  async getById({ _id }) {
    return GameModel.findById(_id);
  },
  async getByUser({ _id }) {
    return GameModel.find({ user_id: _id });
  },
  async deleteById({ _id }) {
    return GameModel.deleteById(_id);
  },
  async create(payload) {
    const game = await new GameModel(payload);
    await game.validateCreate(payload);
    await GameModel.create(game);
    return game;
  },
};

module.exports = GameService;
