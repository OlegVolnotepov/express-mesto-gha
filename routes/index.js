const express = require("express");
const { route } = require("express/lib/application");
const routes = express.Router();

routes.get("/", (req, res) => {
  res.send("yeah");
});

module.exports = {
  routes,
};
