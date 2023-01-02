const express = require("express");

// const notes = require("./data/Data");

const dotenv = require("dotenv");

const userRoutes = require("./routes/userRoutes");
const notesRoutes = require("./routes/notesRoutes");
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");
const cors = require("cors");
require("./config/db");
const app = express();
app.use(cors());
dotenv.config();

app.use(express.json());

// // adding new notes:
// app.post("/api/new-note", (req, res) => {});
// // getting all notes :
// app.get("/api/notes", (req, res) => {
//   res.json(notes);
// });

// getting particular note :
// app.get("/api/notes/:id", (req, res) => {
//   const note = notes.find((item) => item._id === req.params.id);
//   res.send(note);
// });

// getting user details :
app.use("/api/notes", notesRoutes);
app.use("/api/users", userRoutes);
app.use(notFound);
app.use(errorHandler);
const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`app is running on the port ${PORT}`));
