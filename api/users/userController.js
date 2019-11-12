const { User, UserSecretToken } = require('../../models');
const {
  authToken: { generateToken },
  passwordHash: { compareHashPassword },
  secretToken,
  sendMail,
} = require('../../helpers');

const createUser = async (req, res) => {
  try {
    const { id, email, firstname } = await User.create({ ...req.body });
    const confirmCode = secretToken();
    await UserSecretToken.create({ userId: id, token: confirmCode });
    await sendMail(email, confirmCode);
    const token = generateToken(id, email);
    return res.status(201).json({
      message: `Welcome, ${firstname}, Please check email to verify account`,
      token,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getUser = async (req, res) => {
  const { user } = req;
  return res.status(200).json(user);
};

const loginUser = async (req, res) => {
  const { body, user } = req;
  const isValid = await compareHashPassword(body.password, user.password);
  if (isValid) {
    const token = await generateToken(user.id, user.email);
    return res
      .status(200)
      .json({ name: `${user.lastname}, ${user.firstname}`, token });
  }
  return res.status(400).json({ error: 'Invalid Username or Password' });
};

const verifyUser = async (req, res) => {
  const {
    authUser: { id },
  } = req;
  try {
    const active = await User.update({ isActive: true }, { where: { id } });
    if (active) {
      await UserSecretToken.destroy({ where: { userId: id } });
    }
    return res.status(200).json({ message: 'User Account is Active' });
  } catch (error) {
    return res.status(error.status).json({ error: error.message });
  }
};

const resendVerification = async (req, res) => {
  const { authUser } = req;
  try {
    const confirmCode = secretToken();
    const [updated] = await UserSecretToken.update(
      { token: confirmCode },
      { where: { userId: authUser.id } }
    );

    if (updated) {
      await sendMail(authUser.email, confirmCode);
      return res.status(200).json({
        message: 'Verification code, Resent!',
      });
    }
    throw new Error('Cannot Resend Verification at the moment');
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createUser,
  loginUser,
  verifyUser,
  resendVerification,
  getUser,
};
