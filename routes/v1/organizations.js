const express = require('express');
const auth = require('../../middleware/auth');
const router = express.Router();
const matchService = require('../../services/matchService');
const rankingService = require('../../services/rankingService');
const teamService = require('../../services/teamService');
const teamMemberService = require('../../services/teamMemberService');
const organizationService = require('../../services/organizationService');
const organizationMemberService = require('../../services/organizationMemberService');

router.get('/', auth, async (req, res) => {
  try {
    const organization = await organizationService.getAll();
    res.status(200).send(organization);
  } catch (err) {
    res.status(401).send(err.message);
  }
});

router.delete('/:_id', auth, async (req, res) => {
  try {
    const game = await organizationService.deleteById(req.params);
    res.status(200).send(game);
  } catch (err) {
    res.status(401).send(err.message);
  }
});

router.get('/:organization_id', auth, async (req, res) => {
  try {
    const organization = await organizationService.getByOrganization(req.params);
    res.status(200).send(organization);
  } catch (err) {
    res.status(401).send(err.message);
  }
});

router.get('/:organization_id/organization-members', auth, async (req, res) => {
  try {
    const organization_members = await organizationMemberService.getByOrganization(req.params);
    res.status(200).send(organization_members);
  } catch (err) {
    res.status(401).send(err.message);
  }
});

router.get('/:organization_id/matches', auth, async (req, res) => {
  try {
    const teams = await matchService.getByOrganization(req.params);
    res.status(200).send(teams);
  } catch (err) {
    res.status(401).send(err.message);
  }
});

router.get('/:organization_id/teams', auth, async (req, res) => {
  try {
    const teams = await teamService.getByOrganization(req.params);
    res.status(200).send(teams);
  } catch (err) {
    res.status(401).send(err.message);
  }
});

router.get('/:organization_id/rankings', auth, async (req, res) => {
  try {
    const rankings = await rankingService.getByOrganization(req.params);
    res.status(200).send(rankings);
  } catch (err) {
    res.status(401).send(err.message);
  }
});

router.get('/:organization_id/team-members', auth, async (req, res) => {
  try {
    const team_members = await teamMemberService.getByOrganization(req.params);
    res.status(200).send(team_members);
  } catch (err) {
    res.status(401).send(err.message);
  }
});

module.exports = router;
