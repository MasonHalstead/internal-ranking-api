const express = require('express');
const auth = require('../../middleware/auth');
const router = express.Router();
const RankingService = require('../../services/RankingService');
const MatchService = require('../../services/MatchService');

router.get('/', auth, async (req, res) => {
  try {
    const matches = await MatchService.getAll();
    res.status(200).send(matches);
  } catch (err) {
    res.status(401).send(err.message);
  }
});

router.get('/:_id', auth, async (req, res) => {
  try {
    const match = await MatchService.getById(req.params);
    res.status(200).send(match);
  } catch (err) {
    res.status(401).send(err.message);
  }
});

router.delete('/:_id', auth, async (req, res) => {
  try {
    const match = await MatchService.deleteById(req.params);
    res.status(200).send(match);
  } catch (err) {
    res.status(401).send(err.message);
  }
});

router.post('/', auth, async (req, res) => {
  try {
    const game = await MatchService.create(req.body);
    res.status(200).send(game);
  } catch (err) {
    res.status(401).send(err.message);
  }
});

router.get('/:match_id/rankings', auth, async (req, res) => {
  try {
    const ranking = await RankingService.getByMatch(req.params);
    res.status(200).send(ranking);
  } catch (err) {
    res.status(401).send(err.message);
  }
});

module.exports = router;
