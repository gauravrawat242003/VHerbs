const express = require('express');
const router = express.Router();

// import controllers
const {chatBot} = require('../controllers/chatBot');

router.post('/chat', chatBot);

module.exports = router;