const express = require('express');

const usersRouter = express.Router();
const {
  getUsers,
  getUserId,
  createUser,
  updateUser,
  updateAvatar,
  getCurrentUser,
} = require('../controllers/users');

const {} = require('../middlewares/validations');

usersRouter.get('/users', getUsers);

usersRouter.get('/users/me', getCurrentUser);

usersRouter.get('/users/:userId', getUserId);

usersRouter.patch('/users/me', updateUser);

usersRouter.patch('/users/me/avatar', updateAvatar);

module.exports = { usersRouter };
