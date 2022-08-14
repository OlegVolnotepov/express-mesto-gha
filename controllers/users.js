const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');

// const { NODE_ENV, JWT_SECRET } = process.env;

const { OK } = require('../utils/errorMessage');

const BadRequestError = require('../utils/errors/BadRequestError');
const NotFoundError = require('../utils/errors/NotFoundError');
const InternalServerError = require('../utils/errors/InternalServerError');
const ConflictError = require('../utils/errors/ConflictError');

// const getUsers = async (req, res, next) => {
//   try {
//     const user = await User.find({});
//     return res.status(OK).send(user);
//   } catch (err) {
//     // return res
//     //   .status(INTERNAL_SERVER_ERROR)
//     //   .send({ message: 'Ошибка сервера' });
//     next(new InternalServerError('Ошибка сервера'));
//   }
// };
const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => {
      res.status(OK).send(users);
    })
    .catch(next);
};

const getUserId = (req, res, next) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        return next(new NotFoundError('Пользователь не найден'));
      }
      return res.status(OK).send(user);
    })
    .catch(next);
};

const createUser = (req, res, next) => {
  const { email, password } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({
      email,
      password: hash,
      name: req.body.name,
      about: req.body.about,
      avatar: req.body.avatar,
    }))
    .then((user) => {
      res.status(OK).send({
        name: user.name,
        about: user.about,
        avatar: user.avatar,
        email: user.email,
      });
    })
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError('Пользователь с таким email уже существует'));
      }
      if (err.name === 'ValidationError') {
        throw new BadRequestError(err.message);
      }
    })
    .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        // NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        'super-strong-secret',
        {
          expiresIn: '7d',
        },
      );
      return res.send({ JWT: token });
    })
    .catch(next);
};

const updateUser = (req, res, next) => {
  const userId = req.user;
  User.findByIdAndUpdate(userId, {
    name: req.body.name,
    about: req.body.about,
  })
    .then((user) => {
      if (!user) {
        return next(new NotFoundError('Пользователь не найден'));
      }
      return res.status(OK).send({
        name: user.name,
        about: user.about,
        avatar: user.avatar,
        email: user.email,
      });
    })
    .catch(next);
};

const updateAvatar = (req, res, next) => {
  const userId = req.user;
  User.findByIdAndUpdate(userId, {
    avatar: req.body.avatar,
  })
    .then((user) => {
      if (!user) {
        next(new InternalServerError());
      }
      return res.status(OK).send(user);
    })
    .catch(next);
};

const getCurrentUser = (req, res, next) => {
  const { _id } = req.user;

  User.findById(_id)
    .then((user) => {
      if (!user) {
        return next(new NotFoundError('Пользователь не найден.'));
      }

      return res.status(OK).send({
        name: user.name,
        about: user.about,
        avatar: user.avatar,
        email: user.email,
      });
    })
    .catch(next);
};

module.exports = {
  getUsers,
  getUserId,
  createUser,
  updateUser,
  updateAvatar,
  login,
  getCurrentUser,
};
