const cors = require('./cors');
const csrfProtection = require('./csrf');
const errorHandler = require('./error');
const accessTokenCheck = require('./access-token-check');

module.exports = {
  cors,
  csrfProtection,
  errorHandler,
  accessTokenCheck
};
