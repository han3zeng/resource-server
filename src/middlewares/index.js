const cors = require('./cors');
const csrfProtection = require('./csrf');
const errorHandler = require('./error');

module.exports = {
  cors,
  csrfProtection,
  errorHandler
};
