const express = require('express');
const router = express.Router();
const { userSchema } = require('../db/schemas');
const mongoose = require('mongoose');
const config = require('../config');

router.get('/login', async function (req, res, next) {
  const expireDate = () => {
    const timeInterval = 6 * 30 * 24 * 60 * 60 * 1000;
    return new Date(new Date('2021-07-26T05:35:43.000Z').getTime() + timeInterval);
  };
  try {
    const accessToken = req.get('Authorization').split(' ')[1];
    const User = mongoose.model(userSchema.key, userSchema.schema);
    const user = await User.findOne({ accessToken });
    res
      .status(200)
      .cookie('accessToken', accessToken, {
        domain: 'localhost',
        httpOnly: true,
        sameSite: config.nodeEnv === 'production' ? 'none' : 'lax',
        secure: config.nodeEnv === 'production',
        path: '/',
        expires: expireDate()
      })
      .json(user);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
