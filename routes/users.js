const express = require('express');

const usersRouter = express.Router();
const {
  getUsers,
  getUserId,
  updateUser,
  updateAvatar,
  getCurrentUser,
} = require('../controllers/users');

const { userIdValidation } = require('../middlewares/validations');

usersRouter.get('/users', getUsers);

usersRouter.get('/users/me', getCurrentUser);

usersRouter.patch('/users/me', userIdValidation, updateUser);

usersRouter.patch('/users/me/avatar', userIdValidation, updateAvatar);

usersRouter.get('/users/:userId', userIdValidation, getUserId);

module.exports = { usersRouter };
