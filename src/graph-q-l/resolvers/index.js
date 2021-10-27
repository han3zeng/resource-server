const getStories = require('./getStories');
const getStory = require('./getStory');

const resolvers = {
  Query: {
    getStories,
    getStory
  },
  Children: {
    __resolveType (obj, context, info) {
      if (obj.text) {
        return 'leaf';
      } else {
        return 'storyNode';
      }
    }
  }
};

module.exports = resolvers;
