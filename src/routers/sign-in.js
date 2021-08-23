const express = require('express');
const router = express.Router();
const { userSchema } = require('../db/schemas');
const mongoose = require('mongoose');
const config = require('../config');

const { domain } = config;

const expireDate = () => {
  const timeInterval = 6 * 30 * 24 * 60 * 60 * 1000;
  return new Date(new Date().getTime() + timeInterval);
};

router.get('/sign-in', async function (req, res, next) {
  try {
    const accessToken = req.get('Authorization').split(' ')[1];
    const User = mongoose.model(userSchema.key, userSchema.schema);
    const user = await User.findOne({ accessToken });
    if (user) {
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
            avatarURL: user.avatarURL
          }
        });
    } else {
      res
        .status(200)
        .json({
          ok: false,
          messag: 'the access token has no associtaed user'
        });
    }
  } catch (e) {
    next(e);
  }
});

router.get('/sign-in/password', async function (req, res, next) {
  try {

  } catch(e) {
    next(e);
  }
});

module.exports = router;
