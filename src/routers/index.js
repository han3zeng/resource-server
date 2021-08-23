const oauthRouter = require('./oauth');
const signInRouter = require('./sign-in');
const signoutRouter = require('./signout');
const testRouter = require('./test');

module.exports = {
  oauthRouter,
  signInRouter,
  signoutRouter,
  testRouter
};
