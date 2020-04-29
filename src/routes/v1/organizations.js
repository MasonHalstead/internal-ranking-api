const express = require('express');
const auth = require('../../middleware/auth');
const org = require('../../middleware/org');
const router = express.Router();
const userService = require('../../services/userService');
const matchService = require('../../services/matchService');
const rankingService = require('../../services/rankingService');
const teamService = require('../../services/teamService');
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

router.post('/create', auth, async (req, res) => {
  try {
    const user_updates = await organizationService.create(req.body);
    const user = await userService.update(req.user._id, user_updates);
    res.status(200).send(`${user.organization_id}`);
  } catch (err) {
    res.status(401).send(err.message);
  }
});

router.post('/join', auth, async (req, res) => {
  try {
    const user_updates = await organizationService.join(req.body);
    const user = await userService.update(req.user._id, user_updates);
    res.status(200).send(`${user.organization_id}`);
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
    const organization = await organizationService.getById(req.params);
    res.status(200).send(organization);
  } catch (err) {
    res.status(401).send(err.message);
  }
});

router.get('/:organization_id/members', auth, async (req, res) => {
  try {
    const organization_members = await organizationMemberService.getByOrganization(req.params);
    res.status(200).send(organization_members);
  } catch (err) {
    res.status(401).send(err.message);
  }
});

router.post('/:organization_id/members', auth, org, async (req, res) => {
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

module.exports = router;
