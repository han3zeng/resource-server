const oauthRouter = require('./oauth');
const signInRouter = require('./sign-in');
const signoutRouter = require('./signout');
const articleRouter = require('./article');
const testRouter = require('./test');

module.exports = {
  oauthRouter,
  signInRouter,
  signoutRouter,
  articleRouter,
  testRouter
};
