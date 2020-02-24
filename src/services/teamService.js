const { TeamModel } = require('../models/TeamModel');

const TeamService = {
  async getAll() {
    return TeamModel.find();
  },
  async getByOrganization({ organization_id }) {
    return TeamModel.find({
      organization_id,
    });
  },
  async getById({ _id }) {
    return TeamModel.findById(_id);
  },
  async deleteById({ _id }) {
    return TeamModel.deleteById(_id);
  },
  async getByUser({ _id }) {
    return TeamModel.find({ user_id: _id });
  },
  async create(payload) {
    const team = await new TeamModel(payload);
    await team.validateCreate(payload);
    await TeamModel.create(team);
    return team;
  },
};

module.exports = TeamService;
