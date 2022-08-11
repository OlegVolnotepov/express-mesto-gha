const express = require('express');

const cardsRouter = express.Router();
const {
  cardIdValidation,
  createCardValidation,
} = require('../middlewares/validations');

const {
  getCards,
  deleteCard,
  createCard,
  likeCard,
  deleteLike,
} = require('../controllers/cards');

cardsRouter.get('/cards', getCards);

cardsRouter.delete('/cards/:cardId', cardIdValidation, deleteCard);

cardsRouter.post('/cards', createCardValidation, createCard);

cardsRouter.put('/cards/:cardId/likes', cardIdValidation, likeCard);

cardsRouter.delete('/cards/:cardId/likes', cardIdValidation, deleteLike);

module.exports = { cardsRouter };
