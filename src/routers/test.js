const express = require('express');
const router = express.Router();

const { csrfProtection } = require('../middlewares');

router.get('/', function (req, res, next) {
  res.status(200).json({
    message: 'resource server is running!'
  });
});

router.post('/csrf-check', csrfProtection, function (req, res, next) {
  res.status(200).json({
    message: 'check csrf token successfully'
  });
});

module.exports = router;
