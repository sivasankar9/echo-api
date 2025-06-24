const express = require('express');
const router = express.Router();
const skills = require('../../schema/skills');

router.get('/', async (req, res) => {
  const ress = await skills.find({}, { _id: 0 }).exec();
  console.log('skills', ress);
  res.send(ress);
});

  module.exports = router;