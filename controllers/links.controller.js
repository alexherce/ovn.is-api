const validator = require('validator');

const links = require('../models/links.model');

exports.create = function(req, res, next) {
  if (req.body.url && !validator.isEmpty(req.body.url)) {
    if (!validator.isLength(req.body.url, {min: 4, max: 512})) return res.status(400).send({success: false, error: 'invalid_length'});
    if (!validator.isURL(req.body.url)) return res.status(400).send({success: false, error: 'invalid_url'});
  } else {
    return res.status(400).send({success: false, error: 'missing_parameters'});
  }

  links.create({url: req.body.url})
  .then(result => {
    return res.status(201).send({success: true, url: result.url});
  })
  .catch(error => {
    console.log(error);
    return res.status(500).send({success: false, error: error.error, details: error.details});
  })
}
