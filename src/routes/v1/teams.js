const express = require('express');
const auth = require('../../middleware/auth');
const router = express.Router();
const OrganizationService = require('../../services/OrganizationService');
const RankingService = require('../../services/RankingService');
const MatchService = require('../../services/MatchService');
const TeamService = require('../../services/TeamService');
const TeamMemberService = require('../../services/TeamMemberService');

router.get('/', auth, async (req, res) => {
  try {
    const teams = await OrganizationService.getAll();
    res.status(200).send(teams);
  } catch (err) {
    res.status(401).send(err.message);
  }
});

router.get('/:_id', auth, async (req, res) => {
  try {
    const teams = await TeamService.getById(req.params);
    res.status(200).send(teams);
  } catch (err) {
    res.status(401).send(err.message);
  }
});

router.delete('/:_id', auth, async (req, res) => {
  try {
    const team = await TeamService.deleteById(req.params);
    res.status(200).send(team);
  } catch (err) {
    res.status(401).send(err.message);
  }
});

router.post('/', auth, async (req, res) => {
  try {
    const team = await TeamService.create(req.body);
    res.status(200).send(team);
  } catch (err) {
    res.status(401).send(err.message);
  }
});

router.get('/:team_id/team-members', auth, async (req, res) => {
  try {
    const team_members = await TeamMemberService.getByTeam(req.params);
    res.status(200).send(team_members);
  } catch (err) {
    res.status(401).send(err.message);
  }
});

router.get('/:team_id/matches', auth, async (req, res) => {
  try {
    const matches = await MatchService.getByTeam(req.params);
    res.status(200).send(matches);
  } catch (err) {
    res.status(401).send(err.message);
  }
});

router.get('/:team_id/rankings', auth, async (req, res) => {
  try {
    const matches = await RankingService.getByTeam(req.params);
    res.status(200).send(matches);
  } catch (err) {
    res.status(401).send(err.message);
  }
});

module.exports = router;
