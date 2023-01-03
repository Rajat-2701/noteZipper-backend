const express = require("express");
const { registerUser, authUser, updatePassword, emailSend } = require("../controllers/userControllers");
const router = express.Router();
const middleware = require("../validation/validation");
router.route("/register").post(middleware.registerSchema, registerUser);
router.route("/login").post(authUser);
router.route("/update-password").post(updatePassword);
router.route("/email-send").post(emailSend);
module.exports = router;
