const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/sendEmail");
const Token = require("../models/token");
const crypto = require("crypto");
const User = require("../models/user");

exports.signupController = async (req, res) => {
  const { userName, firstName, lastName, email, select, password } = req.body;

  try {
    let user = await User.findOne({ email });
    let username = await User.findOne({ userName });
    if (user) {
      return res.status(400).json({
        errorMessage: "Email already exits",
      });
    }
    if (username) {
      return res.status(400).json({
        errorMessage: "Username not available",
      });
    }
    const newUser = new User();
    newUser.userName = userName;
    newUser.firstName = firstName;
    newUser.lastName = lastName;
    newUser.email = email;
    newUser.select = select;

    const salt = await bcryptjs.genSalt(10);
    newUser.password = await bcryptjs.hash(password, salt);

    await newUser.save();

    let token = await new Token({
      userId: newUser._id,
      token: crypto.randomBytes(32).toString("hex"),
    }).save();

    const message = `
    <p style={{fontSize:"1.3rem", padding:"1rem 0rem"}}>Thank you for creating an account </p>
    <p style={{fontSize:"1.3rem", padding:"1rem 0rem"}}>To continue, please confirm your email address by clicking the link below </p>
    
    ${process.env.BASE_URL}auth/verify/${newUser._id}/${token.token}`;
    await sendEmail(newUser.email, "supremewavescapital Account Activation", message);
    res
      .status(201)
      .json({
        successMessage: "An Email was sent to your account please verify",
      });
    
  } catch (err) {
    console.log("signup:", err);
    res.status(500).json({
      errorMessage: "Server Error",
    });
  }
};

exports.signinController = async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  try {
    const user = await User.findOne({ email });
    console.log(user)
    if (!user) {
      return res.status(400).json({
        errorMessage: "Invalid Credentials",
      });
    }

    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        errorMessage: "Invalid Credetials",
      });
    }

    if (!user.verified) {
      return res
        .status(400)
        .json({
          errorMessage: "Please verify your email!",
        });
    }
    const payload = {
      user: {
        _id: user._id,
      },
    };
    console.log(payload);
    jwt.sign(
      payload,
      process.env.JWT_SECREET,
      { expiresIn: process.env.JWT_EXPIRE },
      (err, token) => {
        if (err) {
          console.log("jwt error", err);
        }
        const { _id, userName, email, role } = user;

        res.json({
          token,
          user: { _id, userName, email, role },
        });
      }
    );
  } catch (err) {
    console.log("signinControllerErr: ", err);
    res.status(500).json({
      errorMessage: "Server Error",
    });
  }
};

exports.email =  async (req, res) => {
  const idUser = req.params.id
  const tokenUser = req.params.token
  console.log(req.params.id)
  console.log(req.params.token)
  try {
		const user = await User.findById({ _id: idUser});
    console.log(user)
		if (!user) return res.status(400).json({ errorMessage: "Invalid link" });

		const token = await Token.findOne({
			userId: user._id,
			token: tokenUser,
		});
    console.log(token)

		if (!token) return res.status(400).send({ errorMessage: "Invalid link" });

		await User.updateOne({ _id: idUser }, {$set:{ verified: true }});
		await token.remove();

		res.status(200).send({ successMessage: "Email verified successfully" });
	} catch (error) {
		res.status(500).send({ errorMessage: "Internal Server Error" });
	}
};
