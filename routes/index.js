const express = require('express');
const router = express.Router();

const linkController = require('../controllers/links.controller');

router.post('/create', linkController.create);

module.exports = router;
