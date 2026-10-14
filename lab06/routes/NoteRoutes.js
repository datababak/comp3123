/*
We want to set up our paths, in other words our routes,
to different URLs that the server can serve
on different methods GET, POST, PUT, DELETE

*/
const NotesModel = require("../models/NotesModel.js")
const express = require("express")
const router = express.Router()


// CREATE a new note
// POST http://localhost:8081/api/notes
router.post("/notes", async (req, res) => {

    // Validate the request
    if(!req.body.content){
        // JSON body that was passed through the method
        return res.status(400).send({
            message: "Note cannot be empty, must fill in the request"
        })
    }

    // If the request was valid
    try{
        // Pull the fields out of the "content" object in the JSON body
        const {
            noteTitle,
            noteDescription,
            priority,
            dateAdded,
            dateUpdated
        } = req.body.content

        const note = new NotesModel({
            noteTitle: req.body.content.noteTitle,
            noteDescription: req.body.content.noteDescription,
            priority: req.body.content.priority,
            dateAdded: req.body.content.dateAdded,
            dateUpdated: req.body.content.dateUpdated
        })

        // Save to MongoDB and send the saved note back
        const savedNote = await note.save()
        res.status(201).send(savedNote)

    } catch(err){
        res.status(500).send({
            message: err.message
        })
    }
})


// READ all notes
// GET http://localhost:8081/api/notes
router.get("/notes", async (req, res) => {

    try{
        const notes = await NotesModel.find()
        res.status(200).send(notes)

    } catch(err){
        res.status(500).send({
            message: err.message
        })
    }
})


// READ one note by its id
// GET http://localhost:8081/api/notes/:noteId
router.get("/notes/:noteId", async (req, res) => {

    try{
        const note = await NotesModel.findById(req.params.noteId)

        // If no note matches this id
        if(!note){
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            })
        }

        res.status(200).send(note)

    } catch(err){
        res.status(500).send({
            message: err.message
        })
    }
})


// UPDATE a note by its id
// PUT http://localhost:8081/api/notes/:noteId
router.put("/notes/:noteId", async (req, res) => {

    // Validate the request
    if(!req.body.content){
        return res.status(400).send({
            message: "Note cannot be empty, must fill in the request"
        })
    }

    try{
        // new: true       -> return the updated note instead of the old one
        // runValidators   -> apply the schema rules (required, enum) on update
        const updatedNote = await NotesModel.findByIdAndUpdate(
            req.params.noteId,
            req.body.content,
            { new: true, runValidators: true }
        )

        // If no note matches this id
        if(!updatedNote){
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            })
        }

        res.status(200).send(updatedNote)

    } catch(err){
        res.status(500).send({
            message: err.message
        })
    }
})


// DELETE a note by its id
// DELETE http://localhost:8081/api/notes/:noteId
router.delete("/notes/:noteId", async (req, res) => {

    try{
        const deletedNote = await NotesModel.findByIdAndDelete(req.params.noteId)

        // If no note matches this id
        if(!deletedNote){
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            })
        }

        res.status(200).send({
            message: "Note deleted successfully"
        })

    } catch(err){
        res.status(500).send({
            message: err.message
        })
    }
})


// Export the router so server.js can use it
module.exports = router