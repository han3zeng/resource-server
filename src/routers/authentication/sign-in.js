const config = require('../../config');
const { csrfProtection, accessTokenCheck } = require('../../middlewares');
const { expireDate } = require('../../utils');

const { domain } = config;

const signInComposer = ({
  router
}) => {
  router.post('/sign-in', csrfProtection, accessTokenCheck, async function (req, res, next) {
    const { accessToken, user } = res.locals;
    if (!user.sub) {
      res
        .status(404)
        .json({
          message: 'Ther server do not generate valid user info for the token. (sub do not exist)'
        });
    }
    res
      .status(200)
      .cookie('accessToken', accessToken, {
        domain,
        httpOnly: true,
        sameSite: config.nodeEnv === 'production' ? 'none' : 'lax',
        secure: config.nodeEnv === 'production',
        path: '/',
        expires: expireDate()
      })
      .json({
        ok: true,
        message: 'find associated user',
        data: {
          name: user.name,
          email: user.email,
          avatarURL: user.avatarURL,
          sub: user.sub
        }
      });
  });
};

module.exports = signInComposer;
