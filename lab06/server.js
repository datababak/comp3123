require("dns").setServers(["8.8.8.8", "1.1.1.1"])
require("dotenv").config();

const express = require("express")
const mongoose = require("mongoose")

const NoteRoutes = require("./routes/NoteRoutes.js")
const DB_URL = process.env.DB_URL;

const PORT = process.env.PORT || 8081

const app = express()

// Middleware
app.use(express.json()) // Serving JSON files
app.use(express.urlencoded({ extended: true })) // Accessing URL parameter and query values

// Root route
app.get("/", (req, res) => {
    res.send("<h2>Welcome to the Note Taking application - Server root path contents </h2>")
})

// Set up the API route - No folder called API, but this will be used in the URL
app.use("/api", NoteRoutes)

// Connect to MongoDB Atlas
mongoose.connect(DB_URL)
    .then(() => {
        console.log("Successfully connected to the MongoDB Atlas server")

        app.listen(PORT, () => {
            console.log(`Server listening on port ${PORT}`)
        })
    })
    .catch((err) => {
        console.log("Could not connect to the DB", err)
        process.exit(1)
    })