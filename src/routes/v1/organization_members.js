const express = require('express');
const auth = require('../../middleware/auth');
const router = express.Router();
const OrganizationMemberService = require('../../services/OrganizationMemberService');

router.get('/', auth, async (req, res) => {
  try {
    const organization_members = await OrganizationMemberService.getAll();
    res.status(200).send(organization_members);
  } catch (err) {
    res.status(401).send(err.message);
  }
});

router.get('/:_id', auth, async (req, res) => {
  try {
    const organization_member = await OrganizationMemberService.getById(req.params);
    res.status(200).send(organization_member);
  } catch (err) {
    res.status(401).send(err.message);
  }
});

router.delete('/:_id', auth, async (req, res) => {
  try {
    const game = await OrganizationMemberService.deleteById(req.params);
    res.status(200).send(game);
  } catch (err) {
    res.status(401).send(err.message);
  }
});

router.post('/', auth, async (req, res) => {
  try {
    const game = await OrganizationMemberService.create(req.body);
    res.status(200).send(game);
  } catch (err) {
    res.status(401).send(err.message);
  }
});

module.exports = router;
