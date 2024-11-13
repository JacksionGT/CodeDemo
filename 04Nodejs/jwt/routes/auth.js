const express = require('express');
const router = express.Router();
const jwt = require('../config/jwt');

router.get('/login', (req, res) => {
  res.render('login');
});

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  
  if (username === 'admin' && password === '123') {
    const token = jwt.sign({ username });
    res.cookie('jwt', token, { 
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 3600000 // 1小时
    });
    res.redirect('/');
  } else {
    res.render('login', { error: '用户名或密码错误' });
  }
});

router.get('/logout', (req, res) => {
  res.clearCookie('jwt');
  res.redirect('/auth/login');
});

module.exports = router;