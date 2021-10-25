const express = require('express');
const router = express.Router();
const getAllComposer = require('./get-all');
const getOneComposer = require('./get-one');
const createComposer = require('./create');

getAllComposer({ router });
getOneComposer({ router });
createComposer({ router });

module.exports = router;
