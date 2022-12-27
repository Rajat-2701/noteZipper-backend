const express = require("express");

const notes = require("./data/Data");

const dotenv = require("dotenv");

const app = express();
dotenv.config();
// getting all notes :
app.get("/api/notes", (req, res) => {
  res.json(notes);
});

// getting particular note :
app.get("/api/notes/:id", (req, res) => {
  const note = notes.find((item) => item._id === req.params.id);
  res.send(note);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`app is running on the port ${PORT}`));
