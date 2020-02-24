const { MatchModel } = require('../models/MatchModel');

const MatchService = {
  async getAll() {
    return MatchModel.find();
  },
  async getByOrganization({ organization_id }) {
    return MatchModel.find({ organization_id });
  },
  async getById({ _id }) {
    return MatchModel.findById(_id);
  },
  async getByGame({ game_id }) {
    return MatchModel.findById(game_id);
  },
  async getByTeam({ team_id }) {
    return MatchModel.find({ team_id });
  },
  async deleteById({ _id }) {
    return MatchModel.deleteById(_id);
  },
  async create(payload) {
    const match = await new MatchModel(payload);
    await match.validateCreate(payload);
    await MatchModel.create(match);
    return match;
  },
};

module.exports = MatchService;
