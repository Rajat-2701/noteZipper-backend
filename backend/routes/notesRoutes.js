const express = require("express");
const { getNotes, createNote } = require("../controllers/notesController");
const verified = require("../middlewares/authorize");
const User = require("../models/userModal");
const router = express.Router();

router.route("/get").get(verified, getNotes);
router.route("/create").post(createNote);

module.exports = router;
