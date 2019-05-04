const express = require('express');
const router = express.Router();

const linkController = require('../controllers/links.controller');

router.get('/', function(req, res, next) {
  return res.status(200).send('OVN.IS online!');
});

router.post('/create', linkController.create);

module.exports = router;
