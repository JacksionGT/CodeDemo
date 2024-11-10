const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

module.exports = {
  sign: (payload) => {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
  },
  verify: (token) => {
    return jwt.verify(token, JWT_SECRET);
  }
}; 