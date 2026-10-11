// ======================================================
// PART 1 - Express Router Practice
// Books and Computers Routes
// ======================================================

const express = require("express")
const fs = require("fs")
var dateFormat = require("dateformat")

var books = require("./Books")
var computers = require("./Computers")

const app = express()
const router = express.Router()


app.use(express.json()) // Parse JSON request bodies for routes such as /login

let writeData = (data) => {
  data += "\n"
  fs.appendFile("server_log.txt", data, function (error) {
    if (error) {
      throw error
    }
    console.log("Log Saved!!")
  })
}

// MiddleWare function
let logger = (req, res, next) => {
  const todays = dateFormat(Date(), "dddd, mmmm dS, yyyy, h:MM:ss TT")
  let data = `[${todays}] - ${req.originalUrl}`
  writeData(data)
  next()
}

app.use(logger)

let booksLogger = (req, res, next) => {
  console.log("Books logger was called")
  next()
}

app.use(booksLogger)
app.use("/books", books)
app.use("/books/computers", computers)



/// ======================================================
// PART 2 - Lab 5 Class Exercise
// ======================================================


// ------------------------------------------------------
// Task 1 - Home Route
// ------------------------------------------------------

app.get("/home", (req, res) => {
  res.sendFile(__dirname + "/home.html")
})


// ------------------------------------------------------
// Task 2 - Profile Route
// ------------------------------------------------------

app.get("/profile", (req, res) => {
  res.sendFile(__dirname + "/user.json")
})


// ------------------------------------------------------
// Task 3 - Login Route
// ------------------------------------------------------

app.post("/login", (req, res) => {
  const user = require("./user.json")

  const { username, password } = req.body

  if (username !== user.username) {
    return res.json({
      status: false,
      message: "User Name is invalid"
    })
  }

  if (password !== user.password) {
    return res.json({
      status: false,
      message: "Password is invalid"
    })
  }

  res.json({
    status: true,
    message: "User Is valid"
  })
})


// ------------------------------------------------------
// Task 4 - Logout Route
// ------------------------------------------------------

app.get("/logout/:username", (req, res) => {
  const username = req.params.username

  res.send(`<b>${username} successfully logged out.</b>`)
})


// ------------------------------------------------------
// Task 5 - Test Route for Error Handling
// ------------------------------------------------------

app.get("/error", (req, res, next) => {
  next(new Error("Test error"))
})


// ------------------------------------------------------
// Task 5 - Error Handling Middleware
// ------------------------------------------------------

app.use((err, req, res, next) => {
  res.status(500).send("Server Error")
})


// ------------------------------------------------------
// Start Server
// ------------------------------------------------------

app.listen(process.env.port || 8081)

console.log(
  "Web server is listening at this port: " + (process.env.port || 8081)
)
