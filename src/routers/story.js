const express = require('express');
const router = express.Router();
const {
  userSchema,
  userStoriesSchema,
  storiesSchema
} = require('../db/schemas');
const mongoose = require('mongoose');
const { csrfProtection } = require('../middlewares');
const shortid = require('shortid');

const insertUserArticle = async ({
  sub,
  storyId,
  title
}) => {
  const UserStories = mongoose.model(userStoriesSchema.key, userStoriesSchema.schema);
  const userStories = await UserStories.findOne({ userId: sub });
  let res = null;
  if (userStories) {
    const update = {
      $push: { stories: [{ storyId, title }] }
    };
    res = await UserStories.updateOne(
      {
        userId: sub
      },
      update
    );
  } else {
    res = await UserStories.create({
      userId: sub,
      stories: [{
        storyId,
        title
      }],
      title
    });
  }
  return res;
};

const checkIfUserExist = async ({
  req
}) => {
  const { accessToken } = req.cookies;
  const User = mongoose.model(userSchema.key, userSchema.schema);
  try {
    const user = await User.findOne({ accessToken });
    return {
      ok: true,
      user
    };
  } catch (e) {
    return {
      ok: false,
      user: null,
      error: e
    };
  }
};

const insertArticle = async ({
  storyId,
  sub,
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
        sub
      },
      {
        content,
        title
      }
    );
  } else {
    res = await Stories.create({
      storyId,
      sub,
      content,
      title
    });
  }
  return res;
};

router.post('/create', csrfProtection, async function (req, res, next) {
  try {
    const { user } = await checkIfUserExist({ req });
    if (user) {
      const {
        sub,
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
        sub: sub,
        content,
        title
      });
      res
        .status(200)
        .json({
          ok: true,
          message: 'create story successfully'
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

router.post('/get-all/', csrfProtection, async function (req, res, next) {
  try {
    const { user } = await checkIfUserExist({ req });
    if (user) {
      const {
        sub
      } = req?.body;
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
            message: `The user hasn't published any story yet.`
          });
      }
    } else {
      res
        .status(200)
        .json({
          ok: false,
          message: 'user do not exist'
        });
    }
  } catch (e) {
    next(e);
  }
});

module.exports = router;
