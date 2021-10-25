const {
  userStoriesSchema
} = require('../../db/schemas');
const mongoose = require('mongoose');
const { csrfProtection } = require('../../middlewares');

const getAllComposer = ({
  router
}) => {
  router.post('/get-all', csrfProtection, async function (req, res, next) {
    try {
      const { sub } = res.locals.user;
      const UserStories = mongoose.model(userStoriesSchema.key, userStoriesSchema.schema);
      const userStories = await UserStories.findOne({ userId: sub });
      if (userStories) {
        res
          .status(200)
          .json({
            ok: true,
            stories: userStories.stories.map((elem) => ({ storyId: elem?.storyId, title: elem?.title })),
            message: 'Fetch stories succesfully'
          });
      } else {
        res
          .status(200)
          .json({
            ok: false,
            stories: [],
            message: "The user hasn't published any story yet."
          });
      }
    } catch (e) {
      next(e);
    }
  });
};

module.exports = getAllComposer;
