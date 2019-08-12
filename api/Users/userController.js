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
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

  createUser,
  getUser,
