const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const sendEmail = require("../utils/sendEmail");


exports.read = async (req, res) => {
  const { email } = req.body;
  try {
    const oldUser = await User.findOne({ email });
    if (!oldUser) {
      return res.status(404).json({
        errorMessage: "Email not found",
      });
    }
    const secret = process.env.JWT_SECREET + oldUser.password;
    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, {
      expiresIn: "5m",
    });
    const message = `
    <h1 style={{fontSize:"1.5rem", fontWeight:"600" padding:"1rem 0rem"}}>Hello ${oldUser.userName}</h1>
    <p style={{fontSize:"1.3rem", padding:"1rem 0rem"}}>To continue with rest password, click on the link below </p>
    
    ${process.env.BASE_URL}reset-password/${oldUser._id}/${token}`;
    await sendEmail(oldUser.email, "supremewavescapital Forgot Password", message);
    res.status(200).json({
      successMessage: "Verify email to continue",
    });
  } catch (err) {
    console.log("err in forgot password controller", err);
    res.status(500).json({
      errorMessage: "Please try again later",
    });
  }
};

exports.get = async (req, res) => {
  const { id, token } = req.params;
  console.log(req.params)
  try {
    const oldUser = User.findOne({ _id: id });
    if (!oldUser) {
      res.status(404).json({
        errorMessage: "Invalid User",
      });
    }
    const secret = process.env.JWT_SECREET + oldUser.password;
    jwt.verify(token, secret)
  
  } catch (err) {
    console.log("err in forgot password controller", err);
    res.status(500).json({
      errorMessage: "Please try again later",
    });
  }
};

exports.create = async (req, res) => {
  const { password } = req.body;
  const { id } = req.params;
  console.log(id, password, req.params)
  try {
    const oldUser = await User.findOne({ _id: id });
    console.log(oldUser)

    if (!oldUser) {
      res.status(404).json({
        errorMessage: "Invalid User",
      });
    }
    const salt = await bcryptjs.genSalt(10);
    const newPassword = await bcryptjs.hash(password, salt);
    console.log(newPassword);
    await User.updateOne(
      { _id: id },
      {
        $set: {
          password: newPassword,
        },
      }
    );
    res.status(200).json({
      successMessage: "Password Updated!!",
    });
  } catch (err) {
    console.log("err in reset password controller", err);
    res.status(500).json({
      errorMessage: "Please try again later",
    });
  }
};
