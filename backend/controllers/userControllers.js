const asyncHandler = require("express-async-handler");
const User = require("../models/userModal");
const jwtToken = require("jsonwebtoken");
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, phone, password, pic } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }
  const user = await User.create({ name, email, phone, password, pic });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      password: user.password,
      isAdmin: user.isAdmin,
      pic: user.pic,
    });
  } else {
    res.status(400);
    throw new Error("Something went wrong!");
  }
});

// email send:
const emailSend = asyncHandler(async (req, res) => {
  // let userEmail = await User.findOne({ email: req.body.email });
  // const responseType = {};
  // if (userEmail) {
  //   let otpCode = Math.floor(Math.random() * 10000 + 1);
  //   let otpData = new Otp({
  //     email: req.body.email,
  //     code: otpCode,
  //     expiredIn: new Date().getTime() + 300 * 1000,
  //   });
  //   let otpResponse = await otpData.save();
  //   responseType.statusText = "Success";
  //   responseType.message = "Please check your email";
  // } else {
  //   responseType.statusText = "error";
  //   responseType.message = "Email id not exists";
  // }
  // res.status(200).send(responseType);
});
// update password api:
const updatePassword = asyncHandler(async (req, res) => {
  // try {
  //   const email = req.body.email;
  //   const password = req.body.password;
  //   const data = await User.findOne({ email: email });
  //   if (data) {
  //     const salt = await bcrypt.genSalt(10);
  //     const newPassword = await bcrypt.hash(password, salt);
  //     const userPassword = await User.findOneAndUpdate(
  //       { email: email },
  //       {
  //         $set: {
  //           password: newPassword,
  //         },
  //       }
  //     );
  //     res.status(200).send({ success: true, msg: "Password updated successfully" });
  //   } else {
  //     res.status(200).send({ success: false, msg: "Email not found" });
  //   }
  // } catch (error) {
  //   res.status(400).send(error.message);
  // }
});

// sending mail using nodemailer:

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    // const token = jwtToken.sign({ _id: user._id }, process.env.TOKEN_SECRET);
    // res.header("auth-token", token).send(token);

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      isAdmin: user.isAdmin,
      pic: user.pic,
      token: jwtToken,
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }
});

module.exports = { registerUser, authUser, emailSend, updatePassword };
