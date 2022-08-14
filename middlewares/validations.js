const { celebrate, Joi } = require('celebrate');

const cardIdValidation = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().length(24).hex(),
  }),
});

const createCardValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
  }),
});

const userIdValidation = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required().length(24).hex(),
  }),
});

const loginValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8).max(30),
  }),
});

const registerValidation = celebrate({
  body: Joi.object()
    .keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8).max(30),
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
    })
    .unknown(true),
});

module.exports = {
  cardIdValidation,
  createCardValidation,
  userIdValidation,
  loginValidation,
  registerValidation,
};
