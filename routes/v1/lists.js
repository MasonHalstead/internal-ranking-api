const express = require('express');
const auth = require('../../middleware/auth');
const router = express.Router();
const OrganizationService = require('../../services/OrganizationService');
const TeamService = require('../../services/TeamService');
const RankingService = require('../../services/RankingService');
const GameService = require('../../services/GameService');
const MatchService = require('../../services/MatchService');
const UserTypeService = require('../../services/UserTypeService');
const StateTypeService = require('../../services/StateTypeService');

router.get('/user-types', auth, async (req, res) => {
  try {
    const user_types = await UserTypeService.getAll();
    res.status(200).send(user_types);
  } catch (err) {
    res.status(401).send(err.message);
  }
});

router.get('/state-types', auth, async (req, res) => {
  try {
    const state_types = await StateTypeService.getAll();
    res.status(200).send(state_types);
  } catch (err) {
    res.status(401).send(err.message);
  }
});

router.get('/organizations', auth, async (req, res) => {
  try {
    const organizations = await OrganizationService.getAll();
    res.status(200).send(organizations);
  } catch (err) {
    res.status(401).send(err.message);
  }
});

router.get('/teams', auth, async (req, res) => {
  try {
    const teams = await TeamService.getAll();
    res.status(200).send(teams);
  } catch (err) {
    res.status(401).send(err.message);
  }
});

router.get('/games', auth, async (req, res) => {
  try {
    const games = await GameService.getAll();
    res.status(200).send(games);
  } catch (err) {
    res.status(401).send(err.message);
  }
});

router.get('/matches', auth, async (req, res) => {
  try {
    const matches = await MatchService.getAll();
    res.status(200).send(matches);
  } catch (err) {
    res.status(401).send(err.message);
  }
});

router.get('/rankings', auth, async (req, res) => {
  try {
    const rankings = await RankingService.getAll();
    res.status(200).send(rankings);
  } catch (err) {
    res.status(401).send(err.message);
  }
});

module.exports = router;
