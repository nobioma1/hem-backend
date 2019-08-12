const { Workspace } = require('../../models');

module.exports = {
  workspaceExists: async (req, res, next) => {
    const { name } = req.body;
    const workspace = await Workspace.findOne({
      where: { name },
    });
    if (!workspace) {
      return next();
    }
    return res.status(400).json({ error: 'Workspace already exists' });
  },
  validateWorkspace: async (req, res, next) => {
    try {
      const { params } = req;
      const workspace = await Workspace.findOne({
        where: params,
      });

      if (workspace) {
        req.workspace = workspace;
        return next();
      }
      throw new Error();
    } catch (error) {
      return res.status(404).json({ error: 'Workspace Does not exist' });
    }
  },
};
