const userRouter = require('express').Router();
const user = require('./userController');
const { schemaValidator: validate } = require('../../helpers');
const schema = require('./userSchema');
const userMiddleware = require('./userMiddleware');
const { authUser } = require('../auth/authMiddleware');

userRouter.post(
  '/register',
  validate(schema.register),
  userMiddleware.validatePassword,
  userMiddleware.userExists,
  user.createUser
);

userRouter.get('/profile', authUser, user.getProfile);

userRouter.get(
  '/profile/:id',
  authUser,
  userMiddleware.validateId,
  user.getUser
);

userRouter.post(
  '/login',
  validate(schema.login),
  userMiddleware.validateEmail,
  user.loginUser
);
userRouter.post(
  '/verify',
  authUser,
  validate(schema.token),
  userMiddleware.tokenExists,
  user.verifyUser
);
userRouter.post(
  '/resend-verification',
  authUser,
  userMiddleware.checkStatus,
  user.resendVerification
);

module.exports = userRouter;
