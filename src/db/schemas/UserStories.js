const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new Schema({
  userId: String,
  stories: [{
    storyId: String,
    title: String
  }]
}, {
  timestamps: {
    currentTime: () => {
      const timeOBJ = new Date();
      return timeOBJ.toUTCString();
    }
  }
});

module.exports = {
  key: 'UserStories',
  schema: schema
};
