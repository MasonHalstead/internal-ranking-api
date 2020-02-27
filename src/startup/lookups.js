const userTypeService = require('../services/userTypeService');
const stateTypeService = require('../services/stateTypeService');

module.exports = () => {
  userTypeService.insertAll();
  stateTypeService.insertAll();
};
