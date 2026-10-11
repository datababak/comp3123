const express = require("express")
const router = express.Router()

router.route("/")
    .get((req, res) => {
        res.send("GET - Get a random book")
    })
    .post((req, res) => {
        res.send("SEND - Add a book")
    })
    .put((req, res) => {
        res.send("PUT - Update a book")
    })

module.exports = router