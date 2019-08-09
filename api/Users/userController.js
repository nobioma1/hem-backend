const { User } = require('../../models');
const { generateToken } = require('../../helpers/authToken');

const createUser = async (req, res) => {
  try {
    const { id, firstname, email } = await User.create(req.body);
    const token = generateToken(id, email);
    return res.status(201).json({ message: `Welcome, ${firstname}`, token });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = { createUser };
