const express = require('express');
const auth = require('../../middleware/auth');
const router = express.Router();
const TeamMemberService = require('../../services/TeamMemberService');

router.get('/', auth, async (req, res) => {
  try {
    const teams = await TeamMemberService.getAll();
    res.status(200).send(teams);
  } catch (err) {
    res.status(401).send(err.message);
  }
});

router.get('/:_id', auth, async (req, res) => {
  try {
    const team_member = await TeamMemberService.getById(req.params);
    res.status(200).send(team_member);
  } catch (err) {
    res.status(401).send(err.message);
  }
});

router.delete('/:_id', auth, async (req, res) => {
  try {
    const team_member = await TeamMemberService.deleteById(req.params);
    res.status(200).send(team_member);
  } catch (err) {
    res.status(401).send(err.message);
  }
});

router.post('/', auth, async (req, res) => {
  try {
    const team_members = await TeamMemberService.createMembers(req.body);
    res.status(200).send(team_members);
  } catch (err) {
    res.status(401).send(err.message);
  }
});

module.exports = router;
