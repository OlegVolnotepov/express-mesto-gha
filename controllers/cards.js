const Cards = require('../models/card');

const { OK, CREATED } = require('../utils/errorMessage');

const BadRequestError = require('../utils/errors/BadRequestError');
const NotFoundError = require('../utils/errors/NotFoundError');

const getCards = (req, res, next) => {
  Cards.find({})
    .then((cards) => {
      if (!cards) {
        return next(new NotFoundError('Карточки не найдены'));
      }
    })
    .catch(next);
};

const deleteCard = (req, res, next) => {
  Cards.findById(req.params.cardId)
    .then((cards) => {
      if (!cards) {
        return next(new NotFoundError('Карточка не найдена'));
      }
      if (cards.owner.valueOf() !== req.user._id) {
        return next(
          new BadRequestError('Можно удалять только вами созданные карточки')
        );
      }
      Cards.findByIdAndRemove(req.params.cardId)
        .then((card) => {
          res.status(OK).send(card);
        })
        .catch(next);
    })
    .catch(next);
};

const createCard = (req, res, next) => {
  Cards.create({
    name: req.body.name,
    link: req.body.link,
    owner: req.user._id,
  })
    .then((card) => {
      res.status(CREATED).send(card);
    })
    .catch(next);
};

const likeCard = (req, res, next) => {
  const cardIds = req.params.cardId;
  Cards.findByIdAndUpdate(
    cardIds,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .then((card) => {
      if (!card) {
        return next(new NotFoundError('Не найден id карточки'));
      }
      return res.status(OK).send(card);
    })
    .catch(next);
};

const deleteLike = (req, res, next) => {
  const cardIds = req.params.cardId;
  Cards.findByIdAndUpdate(
    cardIds,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .then((card) => {
      if (!card) {
        return next(new NotFoundError('Не найден id карточки'));
      }
      return res.status(OK).send(card);
    })
    .catch(next);
};

module.exports = {
  getCards,
  deleteCard,
  createCard,
  likeCard,
  deleteLike,
};
