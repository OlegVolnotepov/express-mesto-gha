const Cards = require('../models/card');

const {
  NOT_FOUND_ERROR,
  OK,
  INTERNAL_SERVER_ERROR,
  BAD_REQUEST_ERROR,
  CREATED,
} = require('../utils/errorMessage');

const getCards = async (req, res) => {
  try {
    const cards = await Cards.find({});

    if (!cards) {
      return res
        .status(NOT_FOUND_ERROR)
        .send({ message: 'Карточки не найдены' });
    }
    return res.status(OK).send(cards);
  } catch (err) {
    return res
      .status(INTERNAL_SERVER_ERROR)
      .send({ message: 'Ошибка сервера' });
  }
};

const deleteCard = async (req, res) => {
  try {
    const cards = await Cards.findByIdAndRemove(req.params.cardId);
    if (!cards) {
      return res
        .status(NOT_FOUND_ERROR)
        .send({ message: 'Карточка не найдена' });
    }
    return res.status(OK).send(cards);
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(BAD_REQUEST_ERROR).send({ message: err.message });
    }
    return res
      .status(INTERNAL_SERVER_ERROR)
      .send({ message: 'Ошибка сервера' });
  }
};

const createCard = async (req, res) => {
  try {
    const card = await Cards.create({
      name: req.body.name,
      link: req.body.link,
      owner: req.user._id,
    });

    return res.status(CREATED).send(card);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(BAD_REQUEST_ERROR).send({ message: err.message });
    }
    return res
      .status(INTERNAL_SERVER_ERROR)
      .send({ message: 'Ошибка сервера' });
  }
};

const likeCard = async (req, res) => {
  const cardIds = req.params.cardId;
  try {
    const card = await Cards.findByIdAndUpdate(
      cardIds,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    );
    if (!card) {
      return res
        .status(NOT_FOUND_ERROR)
        .send({ message: 'Не найден id карточки' });
    }
    return res.status(OK).send(card);
  } catch (err) {
    return res
      .status(INTERNAL_SERVER_ERROR)
      .send({ message: 'Ошибка сервера' });
  }
};

const deleteLike = async (req, res) => {
  const cardIds = req.params.cardId;
  try {
    const card = await Cards.findByIdAndUpdate(
      cardIds,
      { $pull: { likes: req.user._id } },
      { new: true },
    );
    if (!card) {
      return res
        .status(NOT_FOUND_ERROR)
        .send({ message: 'Не найден id карточки' });
    }
    return res.status(OK).send(card);
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(BAD_REQUEST_ERROR).send({ message: err.message });
    }
    return res
      .status(INTERNAL_SERVER_ERROR)
      .send({ message: 'Ошибка сервера' });
  }
};

module.exports = {
  getCards,
  deleteCard,
  createCard,
  likeCard,
  deleteLike,
};
