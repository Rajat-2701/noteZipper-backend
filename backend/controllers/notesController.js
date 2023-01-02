const Note = require("../models/notesModal");
const asyncHandler = require("express-async-handler");

// getting all the notes :

const getNotes = asyncHandler(async (req, res) => {
  const notes = await Note.find();
  res.json(notes);
});

const createNote = asyncHandler(async (req, res) => {
  const { title, price, brand, category } = req.body;

  //   in case there is no title or description:
  if (!title || !category || !brand || !price) {
    res.status(400);
    throw new Error("Please fill the required fields");
    return;
  } else {
    // when all fields are filled properly :
    const note = new Note({ title, price, category, brand });

    // we fill save the notes :
    const createNote = await note.save();

    res.status(201).json(createNote);
  }
});

module.exports = { getNotes, createNote };
