const getStories = require('./getStories');
const getStory = require('./getStory');
const createStory = require('./createStory');
const deleteStory = require('./deleteStory');

const resolvers = {
  Query: {
    getStories,
    getStory
  },
  Mutation: {
    createStory,
    deleteStory
  }
};

module.exports = resolvers;
