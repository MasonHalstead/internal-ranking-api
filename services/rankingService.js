const { RankingModel } = require('../models/RankingModel');

const RankingService = {
  async getAll() {
    return RankingModel.find();
  },
  async getByGame({ game_id }) {
    return RankingModel.find({
      game_id,
    });
  },
  async getByMatch({ match_id }) {
    return RankingModel.find({
      match_id,
    });
  },
  async getByTeam({ team_id }) {
    return RankingModel.find({
      team_id,
    });
  },
  async getByOrganization({ organization_id }) {
    return RankingModel.find({
      organization_id,
    });
  },
  async getById({ _id }) {
    return RankingModel.findById(_id);
  },
  async getByUser({ _id }) {
    return RankingModel.find({ user_id: _id });
  },
  async deleteById({ _id }) {
    return RankingModel.deleteById(_id);
  },
  async create(payload) {
    const ranking = await new RankingModel(payload);
    await ranking.validateCreate(payload);
    await RankingModel.create(ranking);
    return ranking;
  },
};

module.exports = RankingService;
