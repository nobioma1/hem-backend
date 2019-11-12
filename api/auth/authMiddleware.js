const { verifyToken } = require('../../helpers/authToken');
const { User } = require('../../models');

module.exports = {
  authUser: async (req, res, next) => {
    try {
      const token = req.headers.authorization;
      const decoded = verifyToken(token);
      req.authUser = decoded;
      return next();
    } catch (error) {
      return res.status(401).json({ error: error.message });
    }
  },
  userActive: async (req, res, next) => {
    const { id } = req.authUser;
    try {
      const { isActive } = await User.findOne({ where: { id } });
      if (!isActive) {
        throw new Error();
      }
      return next();
    } catch (error) {
      return res
        .status(401)
        .json({ error: 'User Account is not active, Please Verify Account' });
    }
  },
};
