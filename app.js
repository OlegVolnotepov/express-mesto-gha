const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const { usersRouter } = require("./routes/users");
const { cardsRouter } = require("./routes/cards");

const app = express();

app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});

const { PORT = 3001 } = process.env;
mongoose.connect("mongodb://localhost:27017/mestodb", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`);
});

app.use((req, res, next) => {
  req.user = {
    _id: "62e18d536a56a798c7c5e242",
  };

  next();
});

app.use(usersRouter);

app.use(cardsRouter);
