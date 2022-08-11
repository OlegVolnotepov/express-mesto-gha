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

module.exports = {
  cardIdValidation,
  createCardValidation,
};
