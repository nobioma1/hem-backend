const jwt = require('jsonwebtoken');

const SECRET = process.env.SECRET || 'Here!, Look no farther 😈';

module.exports = {
  generateToken(id, email) {
    const token = jwt.sign({ id, email }, SECRET, { expiresIn: '2d' });
    return token;
  },
  verifyToken: token => jwt.verify(token, SECRET),
};
