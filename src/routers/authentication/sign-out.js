const { userSchema } = require('../../db/schemas');
const mongoose = require('mongoose');
const config = require('../../config');

const { domain } = config;

const signOutComposer = ({
  router
}) => {
  router.get('/sign-out', async function (req, res, next) {
    try {
      const { accessToken } = res.locals;
      const User = mongoose.model(userSchema.key, userSchema.schema);
      const result = await User.updateOne(
        { accessToken },
        { accessToken: null }
      );
      if (result.n >= 1) {
        res
          .clearCookie('accessToken')
          .clearCookie('user-profile')
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
  });
};

module.exports = signOutComposer;
