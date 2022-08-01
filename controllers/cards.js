const Cards = require('../models/card');

const getCards = async (req, res) => {
  try {
    const cards = await Cards.find({});

    if (cards) {
      return res.status(200).send(cards);
    }
    res.status(404).send({ message: 'Карточки не найдены' });
  } catch (err) {
    return res.status(500).send(err);
  }
};

const deleteCard = async (req, res) => {
  try {
    const cards = await Cards.findByIdAndRemove(req.params.cardId);
    if (cards) {
      return res.status(200).send(cards);
    }
    res.status(404).send({ message: 'Карточка не найдена' });
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(400).send({ message: err.message });
    }
    return res.status(500).send(err);
  }
};

const createCard = async (req, res) => {
  try {
    const card = await Cards.create({
      name: req.body.name,
      link: req.body.link,
      owner: req.user._id,
    });
    if (card) {
      return res.status(201).send(card);
    }
    res
      .status(500)
      .send({ message: 'Карточка не создана. Что то пошло не так...' });
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).send({ message: err.message });
    }
    return res.status(500).send(err);
  }
};

const likeCard = async (req, res) => {
  const cardIds = req.params.cardId;
  try {
    const card = await Cards.findByIdAndUpdate(
      cardIds,
      { $addToSet: { likes: req.user._id } },
      { new: true }
    ).orFail(() => {
      return res.status(200).send('Не найден id карточки');
    });
    res.status(200).send(card);
  } catch (err) {
    res.status(500).send(err);
  }
};

const deleteLike = async (req, res) => {
  const cardIds = req.params.cardId;
  try {
    const card = await Cards.findByIdAndUpdate(
      cardIds,
      { $pull: { likes: req.user._id } },
      { new: true }
    );
    if (!card) {
      return res.status(404).send({ message: 'Не найден id карточки' });
    }
    res.status(200).send(card);
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(400).send({ message: err.message });
    }
    return res.status(500).send(err);
  }
};

module.exports = {
  getCards,
  deleteCard,
  createCard,
  likeCard,
  deleteLike,
};
