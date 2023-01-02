const express = require("express");
const { getNotes, createNote } = require("../controllers/notesController");
const router = express.Router();

router.route("/get").get(getNotes);
router.route("/create").post(createNote);

module.exports = router;
