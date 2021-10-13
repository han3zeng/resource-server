const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new Schema({
  userId: String,
  articles: [String]
}, {
  timestamps: {
    currentTime: () => {
      const timeOBJ = new Date();
      return timeOBJ.toUTCString();
    }
  }
});

module.exports = {
  key: 'UserArticles',
  schema: schema
};
