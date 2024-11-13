const jwt = require('../config/jwt');

module.exports = (req, res, next) => {
  // 优先从Authorization header获取token
  const authHeader = req.headers['authorization'];
  const bearerToken = authHeader && authHeader.split(' ')[1];
  // 从cookie获取token
  const cookieToken = req.cookies.jwt;
  
  const token = bearerToken || cookieToken;
  
  if (!token) {
    // 如果是API请求，返回401状态码
    if (req.xhr || req.path.startsWith('/api/')) {
      return res.status(401).json({ message: '未提供token' });
    }
    // 如果是页面请求，重定向到登录页
    return res.redirect('/auth/login');
  }

  try {
    const decoded = jwt.verify(token);
    req.user = decoded;
    next();
  } catch (err) {
    if (req.xhr || req.path.startsWith('/api/')) {
      res.status(401).json({ message: 'token无效或已过期' });
    } else {
      res.redirect('/auth/login');
    }
  }
}; 