const { TeamMemberModel } = require('../models/TeamMemberModel');

const TeamMemberService = {
  async getAll() {
    return TeamMemberModel.find();
  },
  async getById({ _id }) {
    return TeamMemberModel.findById(_id);
  },
  async deleteById({ _id }) {
    return TeamMemberModel.deleteById(_id);
  },
  async getByUser({ _id }) {
    return TeamMemberModel.find({ user_id: _id });
  },
  async getByOrganization({ organization_id }) {
    return TeamMemberModel.find({
      organization_id,
    });
  },
  async getByTeam({ team_id }) {
    return TeamMemberModel.find({
      team_id,
    });
  },
  async create(team_id, payload) {
    const team_member = await new TeamMemberModel({ ...payload, team_id });
    await TeamMemberModel.validateCreate(payload);
    await TeamMemberModel.create(team_member);
    return team_member;
  },
  async createMembers(team_id, payload) {
    const team_members = payload.map(member => this.create(team_id, member));
    return team_members;
  },
};

module.exports = TeamMemberService;
