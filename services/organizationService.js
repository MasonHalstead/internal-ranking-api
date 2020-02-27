const { OrganizationModel } = require('../models/organizationModel');

const organizationService = {
  async getAll() {
    return OrganizationModel.find();
  },
  async getByOrganization({ organization_id }) {
    return OrganizationModel.find({
      organization_id,
    });
  },
  async getById({ _id }) {
    return OrganizationModel.findById(_id);
  },
  async deleteById({ _id }) {
    return OrganizationModel.deleteById(_id);
  },
  async getByUser({ _id }) {
    return OrganizationModel.find({ user_id: _id });
  },
  async create(payload) {
    const organization = await new OrganizationModel(payload);
    await organization.validateCreate(payload);
    await OrganizationModel.create(organization);
    return organization;
  },
};

module.exports = organizationService;
