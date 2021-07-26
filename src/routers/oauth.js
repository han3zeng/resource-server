const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const config = require('../config');

router.get('/github', async function (req, res, next) {
  const { authorization: accessToken } = req.headers;
  if (!accessToken) {
    res.status('401').json({
      message: 'No credentials sent'
    });
  }
  const options = {
    method: 'get',
    mode: 'cors',
    cache: 'no-cache',
    headers: {
      Accept: 'application/json',
      Authorization: `token ${accessToken}`
    },
    referrerPolicy: 'no-referrer'
  };

  fetch('https://api.github.com/user', options)
    .then((response) => {
      response.json()
        .then((data) => {
          const { name, email } = data;


        })
        .catch((err) => {
          console.log('err: ', err);
        });
    })
    .catch((err) => {
      console.log('err: ', err);
    });
});

module.exports = router;
