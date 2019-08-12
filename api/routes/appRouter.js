const appRouter = require('express').Router();
const { authUser, userActive } = require('../auth/authMiddleware');
const userRouter = require('../users/userRouter');
const workspaceRouter = require('../workspace/workspaceRouter');

appRouter.use('/', userRouter);
appRouter.use('/workspace', authUser, userActive, workspaceRouter);

module.exports = appRouter;
