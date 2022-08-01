const User = require('../models/user');

const {
  NOT_FOUND_ERROR,
  OK,
  INTERNAL_SERVER_ERROR,
  BAD_REQUEST_ERROR,
  CREATED,
} = require('../utils/errorMessage');

const getUsers = async (req, res) => {
  try {
    const user = await User.find({});
    return res.status(OK).send(user);
  } catch (err) {
    return res
      .status(INTERNAL_SERVER_ERROR)
      .send({ message: 'Ошибка сервера' });
  }
};

const getUserId = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res
        .status(NOT_FOUND_ERROR)
        .send({ message: 'Пользователя с таким id не найдено' });
    }
    return res.status(OK).send(user);
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(BAD_REQUEST_ERROR).send({ message: err.message });
    }
    return res
      .status(INTERNAL_SERVER_ERROR)
      .send({ message: 'Ошибка сервера' });
  }
};

const createUser = async (req, res) => {
  try {
    const user = await User.create({
      name: req.body.name,
      about: req.body.about,
      avatar: req.body.avatar,
    });

    return res.status(CREATED).send(user);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(BAD_REQUEST_ERROR).send({ message: err.message });
    }
    return res
      .status(INTERNAL_SERVER_ERROR)
      .send({ message: 'Ошибка сервера' });
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
      return res.status(OK).send(user);
    }
    return res
      .status(NOT_FOUND_ERROR)
      .send({ message: 'Пользователь не создан, что то пошло не так...' });
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(BAD_REQUEST_ERROR).send({ message: err.message });
    }
    return res
      .status(INTERNAL_SERVER_ERROR)
      .send({ message: 'Ошибка сервера' });
  }
};

const updateAvatar = async (req, res) => {
  const userId = req.user;
  try {
    const user = await User.findByIdAndUpdate(userId, {
      avatar: req.body.avatar,
    });

    if (user) {
      return res.status(OK).send(user);
    }
    return res
      .status(NOT_FOUND_ERROR)
      .send({ message: 'Аватар не обновлен, что то пошло не так...' });
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(BAD_REQUEST_ERROR).send({ message: err.message });
    }
    return res
      .status(INTERNAL_SERVER_ERROR)
      .send({ message: 'Ошибка сервера' });
  }
};

module.exports = {
  getUsers,
  getUserId,
  createUser,
  updateUser,
  updateAvatar,
};
