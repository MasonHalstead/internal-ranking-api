const UserTypeService = require('../services/userTypeService');
const stateTypeService = require('../services/stateTypeService');

module.exports = function() {
  UserTypeService.insertAll();
  stateTypeService.insertAll();
};
