const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new Schema({
  userId: String,
  storyId: String,
  content: [],
  title: String
}, {
  timestamps: {
    currentTime: () => {
      const timeOBJ = new Date();
      return timeOBJ.toUTCString();
    }
  }
});

module.exports = {
  key: 'Stories',
  schema: schema
};
