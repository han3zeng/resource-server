const { userSchema } = require('../db/schemas');
const mongoose = require('mongoose');

const customizedResponse = ({
  res
}) => {
  res
    .status(401)
    .json({
      message: 'You send the request without validated access token.'
    });
};

async function accessTokenCheck (req, res, next) {
  try {
    const accessToken = req?.get('Authorization')?.split(' ')[1] || req.cookies?.accessToken;
    if (!accessToken) {
      customizedResponse({ res });
    }
    const User = mongoose.model(userSchema.key, userSchema.schema);
    const user = await User.findOne({ accessToken });
    if (user) {
      res.locals.accessToken = accessToken;
      res.locals.user = user;
      next();
    } else {
      customizedResponse({ res });
    }
  } catch (e) {
    next(e);
  }
}

module.exports = accessTokenCheck;
