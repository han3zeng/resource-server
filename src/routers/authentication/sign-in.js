const config = require('../../config');
const { expireDate } = require('../../utils');

const { domain } = config;

const signInComposer = ({
  router
}) => {
  router.post('/sign-in', async function (req, res, next) {
    const { accessToken, user } = res.locals;
    if (!user.sub) {
      res
        .status(404)
        .json({
          message: 'Ther server do not generate valid user info for the token. (sub do not exist)'
        });
    }
    const {
      sub,
      email,
      name,
      avatarURL,
      authorizationServer
    } = user;
    res
      .status(200)
      .cookie('accessToken', accessToken, {
        domain,
        httpOnly: true,
        sameSite: 'none',
        secure: true,
        path: '/',
        expires: expireDate()
      })
      .json({
        ok: true,
        message: 'find associated user',
        data: {
          sub,
          email,
          name,
          avatarURL,
          authorizationServer
        }
      });
  });
};

module.exports = signInComposer;
