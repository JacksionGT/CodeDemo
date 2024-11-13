const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

// 首页不需要认证
router.get('/', (req, res) => {
  // 尝试获取用户信息
  const token = req.cookies.jwt;
  console.log(token);
  if (token) {
    try {
      const decoded = require('../config/jwt').verify(token);
      res.render('home', { username: decoded.username });
    } catch (err) {
      res.render('home');
    }
  } else {
    res.render('home');
  }
});

// 获取用户信息的API
router.get('/user', auth, (req, res) => {
  res.json({ username: req.user.username });
});

// 示例页面路由，需要认证
router.get('/example', auth, (req, res) => {
  res.render('example', { username: req.user.username });
});

module.exports = router; 