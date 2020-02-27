const express = require('express');
const auth = require('../../middleware/auth');
const router = express.Router();
const rankingService = require('../../services/rankingService');

router.get('/', auth, async (req, res) => {
  try {
    const rankings = await rankingService.getAll();
    res.status(200).send(rankings);
  } catch (err) {
    res.status(401).send(err.message);
  }
});

router.get('/:_id', auth, async (req, res) => {
  try {
    const rankings = await rankingService.getById(req.params);
    res.status(200).send(rankings);
  } catch (err) {
    res.status(401).send(err.message);
  }
});

router.delete('/:_id', auth, async (req, res) => {
  try {
    const rankings = await rankingService.deleteById(req.params);
    res.status(200).send(rankings);
  } catch (err) {
    res.status(401).send(err.message);
  }
});

router.post('/', auth, async (req, res) => {
  try {
    const rankings = await rankingService.create(req.body);
    res.status(200).send(rankings);
  } catch (err) {
    res.status(401).send(err.message);
  }
});

module.exports = router;
