const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new Schema({
  sub: String,
  articleId: String,
  content: String,
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
  key: 'Articles',
  schema: schema
};
