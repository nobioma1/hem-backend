const userRouter = require('express').Router();
const { createUser } = require('./userController');
const validate = require('../../helpers/schemaValidator');
const userSchema = require('./userSchema');
const { userExists } = require('./userMiddleware');

userRouter.post('/register', validate(userSchema), userExists, createUser);

module.exports = userRouter;
