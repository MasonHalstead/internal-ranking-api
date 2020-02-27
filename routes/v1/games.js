const express = require('express');
const auth = require('../../middleware/auth');
const router = express.Router();
const rankingService = require('../../services/rankingService');
const matchService = require('../../services/matchService');
const gameService = require('../../services/gameService');

router.get('/', auth, async (req, res) => {
  try {
    const games = await gameService.getAll();
    res.status(200).send(games);
  } catch (err) {
    res.status(401).send(err.message);
  }
});

router.get('/:_id', auth, async (req, res) => {
  try {
    const games = await gameService.getById(req.params);
    res.status(200).send(games);
  } catch (err) {
    res.status(401).send(err.message);
  }
});

router.delete('/:_id', auth, async (req, res) => {
  try {
    const game = await gameService.deleteById(req.params);
    res.status(200).send(game);
  } catch (err) {
    res.status(401).send(err.message);
  }
});

router.post('/', auth, async (req, res) => {
  try {
    const game = await gameService.create(req.body);
    res.status(200).send(game);
  } catch (err) {
    res.status(401).send(err.message);
  }
});

router.get('/:game_id/matches', auth, async (req, res) => {
  try {
    const matches = await matchService.getByGame(req.params);
    res.status(200).send(matches);
  } catch (err) {
    res.status(401).send(err.message);
  }
});

router.get('/:game_id/rankings', auth, async (req, res) => {
  try {
    const rankings = await rankingService.getByGame(req.params);
    res.status(200).send(rankings);
  } catch (err) {
    res.status(401).send(err.message);
  }
});

module.exports = router;
