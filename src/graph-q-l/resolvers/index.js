const getStories = require('./getStories');
const getStory = require('./getStory');
const createStory = require('./createStory');

const resolvers = {
  Query: {
    getStories,
    getStory
  },
  Mutation: {
    createStory
  }
};

module.exports = resolvers;
