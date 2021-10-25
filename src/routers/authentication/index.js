const express = require('express');
const router = express.Router();
const signOutComposer = require('./sign-out');
const signInComposer = require('./sign-in');

signOutComposer({ router });
signInComposer({ router });

module.exports = router;
