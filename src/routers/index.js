const oauthRouter = require('./oauth');
const signInRouter = require('./sign-in');
const signoutRouter = require('./signout');
const storyRouter = require('./story');
const testRouter = require('./test');

module.exports = {
  oauthRouter,
  signInRouter,
  signoutRouter,
  storyRouter,
  testRouter
};
