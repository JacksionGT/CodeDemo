const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

router.get('/data', auth, (req, res) => {
  res.json({
    message: '这是受保护的数据',
    user: req.user.username,
    timestamp: new Date()
  });
});

module.exports = router; 