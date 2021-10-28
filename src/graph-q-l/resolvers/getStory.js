const {
  storiesSchema
} = require('../../db/schemas');
const mongoose = require('mongoose');

const storyConstructor = ({
  id = -1,
  content = '',
  storyId = '',
  userId = '',
  title = ''
}) => {
  return {
    id,
    content,
    storyId,
    userId,
    title
  };
};

async function getStory (root, args, context, info) {
  const { storyId } = args;
  const { next } = context;
  try {
    const Stories = mongoose.model(storiesSchema.key, storiesSchema.schema);
    const story = await Stories.findOne({ storyId });
    if (story) {
      const {
        _id: id,
        content,
        userId,
        title
      } = story;
      return storyConstructor({
        id,
        content,
        storyId,
        userId,
        title
      });
    } else {
      return storyConstructor({});
    }
  } catch (e) {
    next(e);
  }
}

module.exports = getStory;
