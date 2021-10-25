const {
  userStoriesSchema,
  storiesSchema
} = require('../../db/schemas');
const mongoose = require('mongoose');
const { csrfProtection } = require('../../middlewares');
const shortid = require('shortid');

const insertUserArticle = async ({
  userId,
  storyId,
  title
}) => {
  const UserStories = mongoose.model(userStoriesSchema.key, userStoriesSchema.schema);
  const userStories = await UserStories.findOne({ userId });
  let res = null;
  if (userStories) {
    const update = {
      $push: { stories: [{ storyId, title }] }
    };
    res = await UserStories.updateOne(
      {
        userId
      },
      update
    );
  } else {
    res = await UserStories.create({
      userId,
      stories: [{
        storyId,
        title
      }],
      title
    });
  }
  return res;
};

const insertArticle = async ({
  storyId,
  userId,
  content,
  title
}) => {
  const Stories = mongoose.model(storiesSchema.key, storiesSchema.schema);
  const story = await Stories.findOne({ storyId });
  let res = null;
  if (story) {
    res = await Stories.updateOne(
      {
        storyId,
        userId
      },
      {
        content,
        title
      }
    );
  } else {
    res = await Stories.create({
      storyId,
      userId,
      content,
      title
    });
  }
  return res;
};

const createComposer = ({
  router
}) => {
  router.post('/create', csrfProtection, async function (req, res, next) {
    try {
      const { sub } = res.locals.user;
      const {
        content,
        title
      } = req?.body;
      const shortId = shortid.generate();
      insertUserArticle({
        userId: sub,
        storyId: shortId,
        title
      });
      insertArticle({
        storyId: shortId,
        userId: sub,
        content,
        title
      });
      res
        .status(201)
        .json({
          ok: true,
          message: 'create story successfully'
        });
    } catch (e) {
      next(e);
    }
  });
};

module.exports = createComposer;
