const { OrganizationModel } = require('../models/organizationModel');

const organizationService = {
  async getAll() {
    return OrganizationModel.find();
  },
  async getById({ organization_id }) {
    const organization = await OrganizationModel.findById({
      _id: organization_id,
    });
    if (!organization) {
      throw new Error('Organization does not exist');
    }
    return organization;
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
    organization.avatar = await organization.randomizeAvatar();
    organization.organization_code = await organization.createCode();
    const new_organization = await OrganizationModel.create(organization);
    return {
      organization_id: new_organization._id,
      admin: true,
      write_access: true,
      read_access: true,
    };
  },
  async join(payload) {
    const organization = await OrganizationModel.findOne(payload);
    if (!organization) {
      throw new Error('Organization does not exist');
    }
    return {
      organization_id: organization._id,
      read_access: true,
    };
  },
};

module.exports = organizationService;
