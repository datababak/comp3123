const express = require("express");
const router = express.Router();

router.route("/game-dev")
  .get((req, res) => {
    res.send("GET - /books/computers/game-dev");
  })
  .post((req, res) => {
    res.send("POST - Add a game-dev book");
  })
  .put((req, res) => {
    res.send("PUT - Update a game-dev book");
  });

router.route("/java").get((req, res) => {
  res.send("GET - /books/computers/java");
});

router.route("/python").get((req, res) => {
  res.send("GET - /books/computers/python");
});

module.exports = router;
