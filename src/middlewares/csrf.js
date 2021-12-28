const csrf = require('csurf');
const config = require('../config');
const { expireDate } = require('../utils');
const { domain } = config;

const csrfProtection = csrf({
  cookie: {
    domain,
    httpOnly: true,
    sameSite: 'none',
    secure: true,
    path: '/',
    expires: expireDate()
  }
});

module.exports = csrfProtection;
