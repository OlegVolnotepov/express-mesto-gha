//const res = require("express/lib/response");
const User = require("../models/user");

const getUsers = async (req, res) => {
  try {
    const user = await User.find({});
    if (user) {
      return res.status(200).send(user);
    } else {
      return res.status(404).send({ message: "пользователи не найдены" });
    }
  } catch (err) {
    return res.status(500).send(err);
  }
};

const getUserId = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (user) {
      return res.status(200).send(user);
    } else {
      return res
        .status(404)
        .send({ message: "Пользователя с таким id не найдено" });
    }
  } catch (err) {
    if (err.name === "ValidationError") {
      return res.status(400).send({ message: err.message });
    }
    return res.status(500).send(err);
  }
};

const createUser = async (req, res) => {
  try {
    const user = await User.create({
      name: req.body.name,
      about: req.body.about,
      avatar: req.body.avatar,
    });
    if (user) {
      return res.status(200).send(user);
    } else {
      return res
        .status(404)
        .send({ message: "Пользователь не создан, что то пошло не так..." });
    }
  } catch (err) {
    if (err.name === "ValidationError") {
      return res.status(400).send({ message: err.message });
    }
    return res.status(500).send(err);
  }
};

const updateUser = async (req, res) => {
  const userId = req.user;
  try {
    const user = await User.findByIdAndUpdate(userId, {
      name: req.body.name,
      about: req.body.about,
    });
    if (user) {
      return res.status(200).send(user);
    } else {
      return res
        .status(404)
        .send({ message: "Пользователь не создан, что то пошло не так..." });
    }
  } catch (err) {
    if (err.name === "ValidationError") {
      return res.status(400).send({ message: err.message });
    }
    return res.status(500).send(err);
  }
};

const updateAvatar = async (req, res) => {
  const userId = req.user;
  try {
    const user = await User.findByIdAndUpdate(userId, {
      avatar: req.body.avatar,
    });

    if (user) {
      return res.status(200).send(user);
    } else {
      return res
        .status(404)
        .send({ message: "Аватар не обновлен, что то пошло не так..." });
    }
  } catch (err) {
    if (err.name === "ValidationError") {
      return res.status(400).send({ message: err.message });
    }
    return res.status(500).send(err);
  }
};

module.exports = {
  getUsers,
  getUserId,
  createUser,
  updateUser,
  updateAvatar,
};
