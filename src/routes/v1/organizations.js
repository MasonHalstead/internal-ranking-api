const express = require('express');
const auth = require('../../middleware/auth');
const router = express.Router();
const MatchService = require('../../services/MatchService');
const RankingService = require('../../services/RankingService');
const TeamService = require('../../services/TeamService');
const TeamMemberService = require('../../services/TeamMemberService');
const OrganizationService = require('../../services/OrganizationService');
const OrganizationMemberService = require('../../services/OrganizationMemberService');

router.get('/', auth, async (req, res) => {
  try {
    const organization = await OrganizationService.getAll();
    res.status(200).send(organization);
  } catch (err) {
    res.status(401).send(err.message);
  }
});

router.delete('/:_id', auth, async (req, res) => {
  try {
    const game = await OrganizationService.deleteById(req.params);
    res.status(200).send(game);
  } catch (err) {
    res.status(401).send(err.message);
  }
});

router.get('/:organization_id', auth, async (req, res) => {
  try {
    const organization = await OrganizationService.getByOrganization(req.params);
    res.status(200).send(organization);
  } catch (err) {
    res.status(401).send(err.message);
  }
});

router.get('/:organization_id/organization-members', auth, async (req, res) => {
  try {
    const organization_members = await OrganizationMemberService.getByOrganization(req.params);
    res.status(200).send(organization_members);
  } catch (err) {
    res.status(401).send(err.message);
  }
});

router.get('/:organization_id/matches', auth, async (req, res) => {
  try {
    const teams = await MatchService.getByOrganization(req.params);
    res.status(200).send(teams);
  } catch (err) {
    res.status(401).send(err.message);
  }
});

router.get('/:organization_id/teams', auth, async (req, res) => {
  try {
    const teams = await TeamService.getByOrganization(req.params);
    res.status(200).send(teams);
  } catch (err) {
    res.status(401).send(err.message);
  }
});

router.get('/:organization_id/rankings', auth, async (req, res) => {
  try {
    const rankings = await RankingService.getByOrganization(req.params);
    res.status(200).send(rankings);
  } catch (err) {
    res.status(401).send(err.message);
  }
});

router.get('/:organization_id/team-members', auth, async (req, res) => {
  try {
    const team_members = await TeamMemberService.getByOrganization(req.params);
    res.status(200).send(team_members);
  } catch (err) {
    res.status(401).send(err.message);
  }
});

module.exports = router;
