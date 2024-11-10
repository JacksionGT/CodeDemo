const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const authRouter = require('./routes/auth');
const indexRouter = require('./routes/index');
const apiRouter = require('./routes/api');

const app = express();

// 设置模板引擎
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// 中间件
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 路由
app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/api', apiRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running...`);
  console.log(`http://localhost:${PORT}`);
}); 