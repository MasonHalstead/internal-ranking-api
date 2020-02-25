const express = require('express');
const auth = require('../../middleware/auth');
const router = express.Router();
const UserService = require('../../services/userService');
const GameService = require('../../services/GameService');
const MatchService = require('../../services/MatchService');
const OrganizationService = require('../../services/OrganizationService');
const RankingService = require('../../services/RankingService');
const TeamService = require('../../services/TeamService');

router.get('/me', auth, async (req, res) => {
  try {
    const user = await UserService.me(req.user);
    res.status(200).send(user);
  } catch (err) {
    res.status(401).send(err.message);
  }
});

router.post('/login', async (req, res) => {
  try {
    const user = await UserService.login(req.body);
    res.status(200).send(user);
  } catch (err) {
    res.status(401).send(err.message);
  }
});

router.post('/register', async (req, res) => {
  try {
    const token = await UserService.register(req.body);
    res.status(200).send(token);
  } catch (err) {
    res.status(401).send(err.message);
  }
});

router.get('/games', auth, async (req, res) => {
  try {
    const games = await GameService.getByUser(req.user);
    res.status(200).send(games);
  } catch (err) {
    res.status(401).send(err.message);
  }
});

router.get('/teams', auth, async (req, res) => {
  try {
    const teams = await TeamService.getByUser(req.user);
    res.status(200).send(teams);
  } catch (err) {
    res.status(401).send(err.message);
  }
});

router.get('/matches', auth, async (req, res) => {
  try {
    const matches = await MatchService.getByUser(req.user);
    res.status(200).send(matches);
  } catch (err) {
    res.status(401).send(err.message);
  }
});

router.get('/organizations', auth, async (req, res) => {
  try {
    const organizations = await OrganizationService.getByUser(req.user);
    res.status(200).send(organizations);
  } catch (err) {
    res.status(401).send(err.message);
  }
});

router.get('/rankings', auth, async (req, res) => {
  try {
    const rankings = await RankingService.getByUser(req.user);
    res.status(200).send(rankings);
  } catch (err) {
    res.status(401).send(err.message);
  }
});

module.exports = router;
