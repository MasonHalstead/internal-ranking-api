const express = require('express');
const auth = require('../../middleware/auth');
const router = express.Router();
const userService = require('../../services/userService');
const gameService = require('../../services/gameService');
const matchService = require('../../services/matchService');
const organizationService = require('../../services/organizationService');
const rankingService = require('../../services/rankingService');
const teamService = require('../../services/teamService');
const friendService = require('../../services/friendService');

router.get('/me', auth, async (req, res) => {
  try {
    const user = await userService.me(req.user);
    res.status(200).send(user);
  } catch (err) {
    res.status(401).send(err.message);
  }
});

router.post('/login', async (req, res) => {
  try {
    const user = await userService.login(req.body);
    res.status(200).send(user);
  } catch (err) {
    res.status(401).send(err.message);
  }
});

router.post('/register', async (req, res) => {
  try {
    const token = await userService.register(req.body);
    res.status(200).send(token);
  } catch (err) {
    if (err.code === 11000) {
      res.status(401).send('Internal Ranking account already exists');
    }
    if (err.code !== 11000) {
      res.status(401).send(err.message);
    }
  }
});

router.put('/update', auth, async (req, res) => {
  try {
    const user = await userService.update(req.user._id, req.body);
    res.status(200).send(user);
  } catch (err) {
    res.status(401).send(err.message);
  }
});

router.get('/token', auth, async (req, res) => {
  try {
    const token = await userService.getToken(req.user);
    res.status(200).send(token);
  } catch (err) {
    res.status(401).send(err.message);
  }
});

router.get('/games', auth, async (req, res) => {
  try {
    const games = await gameService.getByUser(req.user);
    res.status(200).send(games);
  } catch (err) {
    res.status(401).send(err.message);
  }
});

router.get('/teams', auth, async (req, res) => {
  try {
    const teams = await teamService.getByUser(req.user);
    res.status(200).send(teams);
  } catch (err) {
    res.status(401).send(err.message);
  }
});

router.get('/matches', auth, async (req, res) => {
  try {
    const matches = await matchService.getByUser(req.user);
    res.status(200).send(matches);
  } catch (err) {
    res.status(401).send(err.message);
  }
});

router.get('/organizations', auth, async (req, res) => {
  try {
    const organizations = await organizationService.getByUser(req.user);
    res.status(200).send(organizations);
  } catch (err) {
    res.status(401).send(err.message);
  }
});

router.get('/rankings', auth, async (req, res) => {
  try {
    const rankings = await rankingService.getByUser(req.user);
    res.status(200).send(rankings);
  } catch (err) {
    res.status(401).send(err.message);
  }
});

router.get('/friends', auth, async (req, res) => {
  try {
    const sent_friends = await friendService.getByUser(req.user);
    const accepted_friends = await friendService.getByFriend(req.user);
    res.status(200).send([...sent_friends, ...accepted_friends]);
  } catch (err) {
    res.status(401).send(err.message);
  }
});

module.exports = router;
