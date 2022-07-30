const express = require("express");
const usersRouter = express.Router();
const { route } = require("express/lib/application");
const {
  getUsers,
  getUserId,
  createUser,
  updateUser,
  updateAvatar,
} = require("../controllers/users");

usersRouter.get("/users", getUsers);

usersRouter.get("/users/:userId", getUserId);

usersRouter.post("/users", express.json(), createUser);

usersRouter.patch("/users/me", express.json(), updateUser);

usersRouter.patch("/users/me/avatar", express.json(), updateAvatar);

module.exports = { usersRouter };
