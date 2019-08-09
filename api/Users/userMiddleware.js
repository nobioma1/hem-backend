const { User } = require('../../models');

module.exports = {
  userExists: async (req, res, next) => {
    const user = await User.findOne({ where: { email: req.body.email } });
    if (!user) {
      return next();
    }
    return res.status(400).json({ error: 'User with Email already exists' });
  },
};
