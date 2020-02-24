const express = require('express');
const router = express.Router();
const users = require('./users');
const lists = require('./lists');
const games = require('./games');
const matches = require('./matches');
const organizations = require('./organizations');

router.use('/users', users);
router.use('/lists', lists);
router.use('/games', games);
router.use('/matches', matches);
router.use('/organizations', organizations);

module.exports = router;
