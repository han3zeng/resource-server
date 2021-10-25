const {
  storiesSchema
} = require('../../db/schemas');
const mongoose = require('mongoose');
const { csrfProtection } = require('../../middlewares');

const getOneComposer = ({
  router
}) => {
  router.post('/get-one', csrfProtection, async function (req, res, next) {
    try {
      const {
        storyId
      } = req?.body;
      const Stories = mongoose.model(storiesSchema.key, storiesSchema.schema);
      const story = await Stories.findOne({ storyId });
      if (story) {
        res
          .status(200)
          .json({
            ok: true,
            story,
            message: 'Fetch the story successfully'
          });
      } else {
        res
          .status(200)
          .json({
            ok: false,
            story,
            message: 'The story do not exist.'
          });
      }
    } catch (e) {
      next(e);
    }
  });
};

module.exports = getOneComposer;
