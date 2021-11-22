const {
  userStoriesSchema,
  storiesSchema
} = require('../../db/schemas');
const mongoose = require('mongoose');

async function deleteUserStories ({
  storyId,
  userId
}) {
  const UserStories = mongoose.model(userStoriesSchema.key, userStoriesSchema.schema);
  const userStories = await UserStories.findOne({ userId });
  if (userStories) {
    const update = {
      $pull: { stories: { storyId } }
    };
    await UserStories.updateOne(
      {
        userId
      },
      update
    );
    return {
      ok: true
    };
  } else {
    return {
      ok: false
    };
  }
}

async function deleteStoryFromDB ({
  storyId,
  userId
}) {
  const Stories = mongoose.model(storiesSchema.key, storiesSchema.schema);
  await Stories.deleteOne({ storyId, userId });
  return {
    ok: true
  };
}

async function deleteStory (root, args, context, info) {
  const { res, next } = context;
  const { storyId, userId } = args;
  const { sub } = res.locals.user;
  try {
    if (!storyId || !sub) {
      return {
        ok: false,
        message: 'You should provide both storyId and userId'
      };
    }
    const deleteUSResult = await deleteUserStories({
      storyId: storyId,
      userId: sub
    });
    const deleteStoryResult = await deleteStoryFromDB({
      storyId: storyId,
      userId: sub
    });
    if (deleteUSResult && deleteStoryResult) {
      return {
        ok: true,
        message: 'You delete the story successfully.'
      };
    } else {
      return {
        ok: false,
        message: 'The action is failed'
      };
    }
  } catch (e) {
    next(e);
  }
}

module.exports = deleteStory;
