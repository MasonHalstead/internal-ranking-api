const { OrganizationMemberModel } = require('../models/organizationMemberModel');

const organizationMemberService = {
  async getAll() {
    return OrganizationMemberModel.find();
  },
  async getById({ _id }) {
    return OrganizationMemberModel.findById(_id);
  },
  async getByUser({ _id }) {
    return OrganizationMemberModel.find({ user_id: _id });
  },
  async deleteById({ _id }) {
    return OrganizationMemberModel.deleteById(_id);
  },
  async getByOrganization({ organization_id }) {
    return OrganizationMemberModel.find({ organization_id });
  },
  async create(organization_id, payload) {
    const organization_member = await new OrganizationMemberModel({ ...payload, organization_id });
    await OrganizationMemberModel.validateCreate(payload);
    await OrganizationMemberModel.create(organization_member);
    return organization_member;
  },
  async createMembers(organization_id, payload) {
    const organization_members = payload.map(member => this.create(organization_id, member));
    return organization_members;
  },
};

module.exports = organizationMemberService;
