const mongoose = require("mongoose");

const OtpSchema = new mongoose.Schema(
  {
    email: String,
    code: String,
    expiredIn: Number,
  },
  {
    timestamps: true,
  }
);

let Otp = mongoose.model("otp", OtpSchema, "otp");

module.exports = { Otp };
