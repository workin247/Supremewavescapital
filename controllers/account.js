const User = require("../models/user");
const Deposit = require("../models/deposit");
// const Withdraw = require("../models/withdraw");

exports.get = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    console.log(user);
    const userDeposit = await Deposit.find({ user: req.user._id });
    const accountData = user.account;
    const intrestData = user.intrest;
    const bonusData = user.bonus;
    const referralCode = user.referralCode;
    const refBonus = user.refbonus;
    res.status(200).json({
      accountData,
      intrestData,
      bonusData,
      userDeposit,
      referralCode,
      refBonus
    });
  } catch (err) {
    console.log("err fetching user", err);
    res.status(500).json({
      errorMessage: "Please try again later",
    });
  }
};


