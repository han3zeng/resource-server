const { userSchema } = require('../db/schemas');
const mongoose = require('mongoose');
const config = require('../config');
const { clientDomain } = config;
const { expireDate } = require('../utils');

async function initialization (req, res, next) {
  const token = req.csrfToken();
  try {
    const accessToken = req?.get('Authorization')?.split(' ')[1] || req.cookies?.accessToken;
    if (!accessToken) {
      res
        .status(200)
        .json({
          csrfToken: token
        });
    } else {
      const User = mongoose.model(userSchema.key, userSchema.schema);
      const user = await User.findOne({ accessToken });
      if (user) {
        const {
          sub,
          email,
          name,
          avatarURL,
          authorizationServer
        } = user;
        const userProfile = JSON.stringify({
          sub,
          email,
          name,
          avatarURL,
          authorizationServer
        });
        res
          .status(200)
          .cookie('user-profile', userProfile, {
            clientDomain,
            httpOnly: false,
            sameSite: config.nodeEnv === 'production' ? 'strict' : 'lax',
            secure: config.nodeEnv === 'production',
            path: '/',
            expires: expireDate(),
            encode: String
          })
          .json({
            csrfToken: token
          });
      } else {
        res
          .status(200)
          .json({
            csrfToken: token
          });
      }
    }
  } catch (e) {
    next(e);
  }
}

module.exports = initialization;
