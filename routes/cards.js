const express = require('express');

const cardsRouter = express.Router();

const {
  getCards,
  deleteCard,
  createCard,
  likeCard,
  deleteLike,
} = require('../controllers/cards');

cardsRouter.get('/cards', getCards);

cardsRouter.delete('/cards/:cardId', deleteCard);

cardsRouter.post('/cards', express.json(), createCard);

cardsRouter.put('/cards/:cardId/likes', express.json(), likeCard);

cardsRouter.delete('/cards/:cardId/likes', express.json(), deleteLike);

module.exports = { cardsRouter };
