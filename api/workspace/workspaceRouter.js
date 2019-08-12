const workspaceRouter = require('express').Router();
const workspace = require('./workspaceController');
const workspaceMiddleware = require('./workspaceMiddleware');
const { schemaValidator: validate } = require('../../helpers');
const { workspaceBody } = require('./workspaceSchema');

workspaceRouter.post(
  '/',
  workspaceMiddleware.workspaceExists,
  validate(workspaceBody),
  workspace.createWorkspace,
);
workspaceRouter.get(
  '/:name',
  workspaceMiddleware.validateWorkspace,
  workspace.getWorkspace,
);
workspaceRouter.put(
  '/:id',
  workspaceMiddleware.validateWorkspace,
  validate(workspaceBody),
  workspace.updateWorkspace,
);
workspaceRouter.delete(
  '/:id',
  workspaceMiddleware.validateWorkspace,
  workspace.removeWorkspace,
);

module.exports = workspaceRouter;
