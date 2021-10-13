const express = require('express');
const router = express.Router();
const {
  userSchema,
  userArticlesSchema,
  articlesSchema
} = require('../db/schemas');
const mongoose = require('mongoose');
const { csrfProtection } = require('../middlewares');
const shortid = require('shortid');

const insertUserArticle = async ({
  sub,
  articleId
}) => {
  const UserArticles = mongoose.model(userArticlesSchema.key, userArticlesSchema.schema);
  const userArticles = await UserArticles.findOne({ userId: sub });
  let res = null;
  if (userArticles) {
    const update = {
      $push: { articles: [articleId] }
    };
    res = await UserArticles.updateOne(
      {
        userId: sub
      },
      update
    );
  } else {
    res = await UserArticles.create({
      userId: sub,
      articles: [articleId]
    });
  }
  return res;
};

const insertArticle = async ({
  articleId,
  sub,
  content,
  title
}) => {
  const Articles = mongoose.model(articlesSchema.key, articlesSchema.schema);
  const article = await Articles.findOne({ articleId });
  let res = null;
  if (article) {
    res = await Articles.updateOne(
      {
        articleId,
        sub
      },
      {
        content,
        title
      }
    );
  } else {
    res = await Articles.create({
      articleId,
      sub,
      content,
      title
    });
  }
  return res;
};

router.post('/create', csrfProtection, async function (req, res, next) {
  try {
    const { accessToken } = req.cookies;
    const User = mongoose.model(userSchema.key, userSchema.schema);
    const user = await User.findOne({ accessToken });
    if (user) {
      const {
        sub,
        content,
        title
      } = req?.body;
      const shortId = shortid.generate();
      insertUserArticle({
        userId: sub,
        articleId: shortId
      });
      insertArticle({
        articleId: shortId,
        sub: sub,
        content,
        title
      });
      res
        .status(200)
        .json({
          ok: true,
          message: 'create article successfully'
        });
    } else {
      res
        .status(200)
        .json({
          ok: false,
          messag: 'the access token has no associtaed user'
        });
    }
  } catch (e) {
    next(e);
  }
});

module.exports = router;
