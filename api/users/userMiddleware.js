const { User, UserSecretToken } = require('../../models');

module.exports = {
  userExists: async (req, res, next) => {
    const user = await User.findOne({ where: { email: req.body.email } });
    if (!user) {
      return next();
    }
    return res.status(400).json({ error: 'User with Email already exists' });
  },
  validateEmail: async (req, res, next) => {
    const user = await User.findOne({ where: { email: req.body.email } });
    if (user) {
      req.user = user;
      return next();
    }
    return res.status(404).json({ error: 'User with Email Does not exist' });
  },
  validateId: async (req, res, next) => {
    const user = await User.findOne({ where: { id: req.params.id } });
    if (user) {
      delete user.dataValues.password;
      req.user = user;
      return next();
    }
    return res.status(404).json({ error: 'User Does not exist' });
  },
  tokenExists: async (req, res, next) => {
    const { authUser, body } = req;
    const secretToken = await UserSecretToken.findOne({
      where: { token: body.secretToken, userId: authUser.id },
    });
    if (secretToken) {
      return next();
    }
    return res.status(400).json({ error: 'Invalid Token' });
  },
  checkStatus: async (req, res, next) => {
    const { id } = req.authUser;
    const { isActive } = await User.findOne({ where: { id } });

    if (!isActive) {
      return next();
    }
    return res.status(400).json({ error: 'User Account is already active' });
  },
  validatePassword: async (req, res, next) => {
    const { password, confirmPassword } = req.body    
    if (password === confirmPassword) {
      return next();
    }
    return res.status(400).json({ error: 'Passwords do not match' });
  },
};
