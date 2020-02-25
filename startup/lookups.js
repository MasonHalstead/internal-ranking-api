const UserTypeService = require('../services/userTypeService');
const stateTypeService = require('../services/stateTypeService');

module.exports = () => {
  UserTypeService.insertAll();
  stateTypeService.insertAll();
};
