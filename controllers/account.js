const User = require("../models/user");
const Deposit = require("../models/deposit");
// const Withdraw = require("../models/withdraw");

exports.get = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const userDeposit = await Deposit.find({ user: req.user._id });
    const accountData = user.account;
    const intrestData = user.intrest;
    const bonusData = user.bonus;
    console.log(userDeposit);
    res.status(200).json({
      accountData,
      intrestData,
      bonusData,
      userDeposit,
    });
  } catch (err) {
    console.log("err fetching user", err);
    res.status(500).json({
      errorMessage: "Please try again later",
    });
  }
};

// exports.status = async (req, res) => {
//   try {
//     const getStatus = await Withdraw.find({user: req.user._id });
//     const accountBalance = await User.findById(req.user._id);
//     console.log(getStatus, "respo");

//     const checkStatus = getStatus.status
//     const getAmount = getStatus.withdrawAmount
//     const accountData = accountBalance.account
//     console.log(checkStatus);
//     if(checkStatus === "Approved"){
//       accountData - getAmount
//     }
//     // res.status(200).json({
//     //   accountData,
//     // });
//   } catch (err) {
//     console.log("err for deposit controller", err);
//     res.status(500).json({
//       errorMessage: "Please try again later",
//     });
//   }
// };
