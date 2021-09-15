const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const session = require("express-session");

const notes = require("../../data/models/notesModel");
const users = require("../../data/models/usersModel");

// checkNote middleware
const checkNote = (req, res, next) => {
  if (!req.body.title || !req.body.content) {
    return res.status(400).json({ message: "All fields must be completed." });
  }
  next();
};

// get notes
router.get("/notes", async (req, res) => {
  try {
    // get all notes
    const allNotes = await notes.get().orderBy("id", "desc");

    // setup the order string
    const noteOrderString = await users.getNoteOrder(1);

    // parse the json and extract the noteOrderArray
    const noteOrderArray = JSON.parse(noteOrderString.noteOrder);
    // check there is a note order array
    if (noteOrderArray.length === 0) {
      return res.status(200).json(allNotes);
    } else {
      // set an orderedNotes by mapping over the array and ordering via a find
      const orderedNotes = noteOrderArray.map(order => {
        return allNotes.find(note => note.id === order);
      });
      // return the ordered notes to the caller
      return res.status(200).json(orderedNotes);
    }
  } catch (error) {
    // cath any error left and send it to the caller
    return res.status(500).json({
      message: "the notes could not be retrieved",
      error: error.message
    });
  }
});

// get note at id
router.get("/notes/:id", async (req, res) => {
  try {
    // get the note at the id provided in the params
    const note = await notes.get(req.params.id);
    // test that it returns a note at that id and if not return a 404
    if (!note) {
      return res
        .status(404)
        .json({ message: `the note does not exist at id of ${req.params.id}` });
    }
    // otherwise return the 200 success
    return res.status(200).json(note);
  } catch (error) {
    // catch any other error and return a 500
    return res.status(500).json({
      message: "the note could not be retrieved",
      error: error.message
    });
  }
});

router.get("/", (req, res) => {
  res.send(`Api running on port: ${port}`);
});

// post notes (create a new note)
router.post("/notes", checkNote, async (req, res) => {
  try {
    // create a new note based on the caller body
    const newNote = await notes.insert(req.body);
    console.log(newNote);
    // set an order string from the users table
    const noteOrderString = await users.getNoteOrder(1);

    // using json parse the order string array in to an array
    const noteOrderArray = JSON.parse(noteOrderString.noteOrder);

    // unshift the newNote.id from the order array
    noteOrderArray.unshift(newNote.id);

    // the updated note order from the note order array using json stringify
    const updatedNoteOrder = { noteOrder: JSON.stringify(noteOrderArray) };

    // update the note order in the users table
    await users.updateNoteOrder(1, updatedNoteOrder);

    // respond with a 201 on success
    return res.status(201).json(newNote);
  } catch (error) {
    // catch any error and return a 500
    return res.status(500).json({
      message: "the note could not be added",
      error: error.message
    });
  }
});

// put note at id (edit note)
router.put("/notes/:id", checkNote, async (req, res) => {
  try {
    // set edited note to the updated notes
    const editedNote = await notes.update(req.params.id, req.body);

    // make sure that edited note is not null
    if (editedNote === 0) {
      // if it is then send a 404
      return res.status(404).json({ message: "the note does not exist" });
    } else {
      // otherwise send a 200 on success
      return res.status(200).json(editedNote);
    }
  } catch (error) {
    // catch any other error and send a 500
    return res
      .status(500)
      .json({ message: "the note could not be edited", error: error.message });
  }
});

// delete note at id
router.delete("/notes/:id", async (req, res) => {
  try {
    // set deleted note to the notes.delete return
    const deletedNote = await notes.delete(req.params.id);

    // make sure deletedNorte is not null
    if (deletedNote === 0) {
      // otherwise return a 404
      return res.status(404).json({ message: "the note does not exist" });
    } else {
      // get the order string from users
      const noteOrderString = await users.getNoteOrder(1);
      // set the order array by parsing the json and taking out note order array
      let noteOrderArray = JSON.parse(noteOrderString.noteOrder);

      // update to the new ordered array by doing a filter on the array
      noteOrderArray = noteOrderArray.filter(id => id != req.params.id);

      // set the updated note order to the new note order
      const updatedNoteOrder = { noteOrder: JSON.stringify(noteOrderArray) };

      // update the note order in the data
      await users.updateNoteOrder(1, updatedNoteOrder);

      // return the deleted note with a status of 200
      return res.status(200).json(deletedNote);
    }
  } catch (error) {
    // catch any other error and return a 500 with the eorrro message
    return res
      .status(500)
      .json({ message: "the note could not be deleted", error: error.message });
  }
});

module.exports = router;
