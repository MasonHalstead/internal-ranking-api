const express = require('express');
const auth = require('../../middleware/auth');
const router = express.Router();
const teamMemberService = require('../../services/teamMemberService');

router.get('/', auth, async (req, res) => {
  try {
    const teams = await teamMemberService.getAll();
    res.status(200).send(teams);
  } catch (err) {
    res.status(401).send(err.message);
  }
});

router.get('/:_id', auth, async (req, res) => {
  try {
    const team_member = await teamMemberService.getById(req.params);
    res.status(200).send(team_member);
  } catch (err) {
    res.status(401).send(err.message);
  }
});

router.delete('/:_id', auth, async (req, res) => {
  try {
    const team_member = await teamMemberService.deleteById(req.params);
    res.status(200).send(team_member);
  } catch (err) {
    res.status(401).send(err.message);
  }
});

router.post('/', auth, async (req, res) => {
  try {
    const team_members = await teamMemberService.createMembers(req.body);
    res.status(200).send(team_members);
  } catch (err) {
    res.status(401).send(err.message);
  }
});

module.exports = router;
