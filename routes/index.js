const express = require('express');
const chatgptRouter = require('./chatgpt-router');
const router = express.Router();

router.use('/chatgpt', chatgptRouter);

module.exports = router;
