const {
  userStoriesSchema
} = require('../db/schemas');
const mongoose = require('mongoose');

async function getStories (root, args, context, info) {
  const { res, next } = context;
  try {
    const { sub } = res?.locals?.user;
    const UserStories = mongoose.model(userStoriesSchema.key, userStoriesSchema.schema);
    const userStories = await UserStories.findOne({ userId: sub });
    const { userId, stories, _id: id } = userStories;
    if (userStories) {
      return {
        id,
        userId,
        stories
      };
    } else {
      return {
        id: -1,
        userId: '',
        storeis: []
      };
    }
  } catch (e) {
    next(e);
  }
}

module.exports = getStories;
