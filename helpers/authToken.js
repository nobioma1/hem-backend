const jwt = require('jsonwebtoken');

const SECRET = process.env.SECRET || 'Look no farther 😈';

module.exports = {
  generateToken(id, email) {
    const token = jwt.sign({ id, email }, SECRET, { expiresIn: '24h' });
    return token;
  },
};
