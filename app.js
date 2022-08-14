const express = require('express');
const mongoose = require('mongoose');
const { usersRouter } = require('./routes/users');
const { cardsRouter } = require('./routes/cards');
const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
const {
  loginValidation,
  registerValidation,
} = require('./middlewares/validations');
const { errors } = require('celebrate');
require('dotenv').config();

const app = express();

app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});

const { PORT = 3000 } = process.env;
mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  autoIndex: true,
});

app.use(express.json());

// app.use((req, res, next) => {
//   req.user = {
//     _id: '62f8a529f4e9fad3a622832f',
//   };

//   next();
// });

app.post('/signin', loginValidation, login);
app.post('/signup', registerValidation, createUser);

app.use(auth);

app.use(usersRouter);

app.use(cardsRouter);

app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res.status(statusCode).send({
    message: statusCode === 500 ? 'На сервере произошла ошибка' : message,
  });
});

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`);
});
