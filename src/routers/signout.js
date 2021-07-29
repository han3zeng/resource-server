const express = require('express');
const router = express.Router();
const { userSchema } = require('../db/schemas');
const mongoose = require('mongoose');
const config = require('../config');

router.get('/signout', async function (req, res, next) {
  const cookies = req.cookies;
  if (!cookies) {
    res.status(401).json({
      message: 'Unauthorized Request'
    });
  } else {
    try {
      const accessToken = cookies.accessToken;
      const User = mongoose.model(userSchema.key, userSchema.schema);
      const result = await User.updateOne(
        { accessToken },
        { accessToken: null }
      );
      if (result.n >= 1) {
        res
          .clearCookie('accessToken', {
            domain: 'localhost',
            httpOnly: true,
            sameSite: config.nodeEnv === 'production' ? 'none' : 'lax',
            secure: config.nodeEnv === 'production',
            path: '/'
          })
          .status(200)
          .json({
            message: 'sign out successfully'
          });
      } else {
        res.status(401).json({
          message: 'Unauthorized Request'
        });
      }
    } catch (e) {
      next(e);
    }
  }
});

module.exports = router;
