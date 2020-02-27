const express = require('express');
const auth = require('../../middleware/auth');
const router = express.Router();
const organizationService = require('../../services/organizationService');
const rankingService = require('../../services/rankingService');
const matchService = require('../../services/matchService');
const teamService = require('../../services/teamService');
const teamMemberService = require('../../services/teamMemberService');

router.get('/', auth, async (req, res) => {
  try {
    const teams = await organizationService.getAll();
    res.status(200).send(teams);
  } catch (err) {
    res.status(401).send(err.message);
  }
});

router.get('/:_id', auth, async (req, res) => {
  try {
    const teams = await teamService.getById(req.params);
    res.status(200).send(teams);
  } catch (err) {
    res.status(401).send(err.message);
  }
});

router.delete('/:_id', auth, async (req, res) => {
  try {
    const team = await teamService.deleteById(req.params);
    res.status(200).send(team);
  } catch (err) {
    res.status(401).send(err.message);
  }
});

router.post('/', auth, async (req, res) => {
  try {
    const team = await teamService.create(req.body);
    res.status(200).send(team);
  } catch (err) {
    res.status(401).send(err.message);
  }
});

router.get('/:team_id/team-members', auth, async (req, res) => {
  try {
    const team_members = await teamMemberService.getByTeam(req.params);
    res.status(200).send(team_members);
  } catch (err) {
    res.status(401).send(err.message);
  }
});

router.get('/:team_id/matches', auth, async (req, res) => {
  try {
    const matches = await matchService.getByTeam(req.params);
    res.status(200).send(matches);
  } catch (err) {
    res.status(401).send(err.message);
  }
});

router.get('/:team_id/rankings', auth, async (req, res) => {
  try {
    const matches = await rankingService.getByTeam(req.params);
    res.status(200).send(matches);
  } catch (err) {
    res.status(401).send(err.message);
  }
});

module.exports = router;
