const appRouter = require('express').Router();
const userRouter = require('../Users/userRouter');

appRouter.use('/', userRouter);

module.exports = appRouter;
