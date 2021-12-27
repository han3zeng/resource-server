const cors = require('./cors');
const csrfProtection = require('./csrf');
const errorHandler = require('./error');
const accessTokenCheck = require('./access-token-check');
const initialization = require('./initialization');

module.exports = {
  cors,
  csrfProtection,
  errorHandler,
  accessTokenCheck,
  initialization
};
