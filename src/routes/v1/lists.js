const express = require('express');
const auth = require('../../middleware/auth');
const router = express.Router();
const organizationService = require('../../services/organizationService');
const teamService = require('../../services/teamService');
const rankingService = require('../../services/rankingService');
const gameService = require('../../services/gameService');
const matchService = require('../../services/matchService');
const userTypeService = require('../../services/userTypeService');
const stateTypeService = require('../../services/stateTypeService');

router.get('/user-types', auth, async (req, res) => {
  try {
    const user_types = await userTypeService.getAll();
    res.status(200).send(user_types);
  } catch (err) {
    res.status(401).send(err.message);
  }
});

router.get('/state-types', auth, async (req, res) => {
  try {
    const state_types = await stateTypeService.getAll();
    res.status(200).send(state_types);
  } catch (err) {
    res.status(401).send(err.message);
  }
});

router.get('/organizations', auth, async (req, res) => {
  try {
    const organizations = await organizationService.getAll();
    res.status(200).send(organizations);
  } catch (err) {
    res.status(401).send(err.message);
  }
});

router.get('/teams', auth, async (req, res) => {
  try {
    const teams = await teamService.getAll();
    res.status(200).send(teams);
  } catch (err) {
    res.status(401).send(err.message);
  }
});

router.get('/games', auth, async (req, res) => {
  try {
    const games = await gameService.getAll();
    res.status(200).send(games);
  } catch (err) {
    res.status(401).send(err.message);
  }
});

router.get('/matches', auth, async (req, res) => {
  try {
    const matches = await matchService.getAll();
    res.status(200).send(matches);
  } catch (err) {
    res.status(401).send(err.message);
  }
});

router.get('/rankings', auth, async (req, res) => {
  try {
    const rankings = await rankingService.getAll();
    res.status(200).send(rankings);
  } catch (err) {
    res.status(401).send(err.message);
  }
});

module.exports = router;
