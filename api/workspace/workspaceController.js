const { Workspace } = require('../../models');

const createWorkspace = async (req, res) => {
  const {
    authUser: { id },
    body: workspace,
  } = req;
  try {
    const newWorkspace = await Workspace.create({
      ...workspace,
      createdBy: id,
    });
    return res.status(201).json(newWorkspace);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getWorkspace = async (req, res) => {
  const { workspace } = req;
  return res.status(200).json(workspace);
};

const updateWorkspace = async (req, res) => {
  const { workspace, body } = req;
  try {
    const [, [updated]] = await Workspace.update(body, {
      where: { id: workspace.id },
      returning: true,
    });

    return res.status(200).json(updated);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const removeWorkspace = async (req, res) => {
  const { id, createdBy } = req.workspace;
  try {
    await Workspace.destroy({ where: { id, createdBy } });
    return res.status(204).end();
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createWorkspace,
  updateWorkspace,
  removeWorkspace,
  getWorkspace,
};
