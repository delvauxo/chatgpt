const express = require('express');
const chatgptController = require('../controllers/chatgpt-controller');
const router = express.Router();

// chatgpt API routes
router.get('/', (req, res) => {
    res.send('Hello World!');
});

router.post('/', chatgptController.chatCompletion);

module.exports = router;
