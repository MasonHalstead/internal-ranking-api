const { UserTypeService } = require('../services/userTypeService');
const { StateTypeService } = require('../services/stateTypeService');

module.exports = () => {
  UserTypeService.insertAll();
  StateTypeService.insertAll();
};
