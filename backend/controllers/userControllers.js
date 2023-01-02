const asyncHandler = require("express-async-handler");

const User = require("../models/userModal");
const { registerValidation } = require("../validation/validation");

const registerUser = asyncHandler(async (req, res) => {
  // const { name, email, password, pic } = req.body;

  const result = await registerValidation.validateAsync(req.body);
  if (result) {
    res.status(400);
    throw new Error(result);
  }
  const userExists = await User.findOne({ email: result.email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }
  const user = await User.create(result);

  if (user) {
    res
      .status(201)
      .json({ _id: result._id, name: result.name, email: result.email, isAdmin: result.isAdmin, pic: result.pic });
  } else {
    res.status(400);
    throw new Error("Something went wrong!");
  }
});

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  const user = await User.findOne({ email: email });
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      pic: user.pic,
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }
});

module.exports = { registerUser, authUser };
