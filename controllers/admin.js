const User = require("../models/user");
const Withdraw = require("../models/withdraw");
const Deposit = require("../models/deposit");

exports.getUser = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json({
      users,
    });
  } catch (err) {
    console.log("geting users controller", err);
    res.status(500).json({
      errorMessage: "Please try again later",
    });
  }
};

exports.getDeposits = async (req, res) => {
  try {
    const deposits = await Deposit.find({});
    res.status(200).json({
      deposits,
    });
  } catch (err) {
    console.log("deposits controller", err);
    res.status(500).json({
      errorMessage: "Please try again later",
    });
  }
};
exports.getDeposit = async (req, res) => {
  const userId = req.params.userId;
  try {
    const deposit = await Deposit.findById(userId);
    console.log(deposit);

    res.json({ deposit });
  } catch (err) {
    console.log("err for getting single user controller.read", err);
    res.status(500).json({
      errorMessage: "Please try again later",
    });
  }
};
exports.update = async (req, res) => {
  const userId = req.params.userId;

  await Deposit.findByIdAndUpdate(userId, req.body);

  res.json({
    successMessage: "user successfully updated",
  });
};

exports.getWithdrawals = async (req, res) => {
  try {
    const withdrawals = await Withdraw.find({});
    res.status(200).json({
      withdrawals,
    });
  } catch (err) {
    console.log("withdrawals controller", err);
    res.status(500).json({
      errorMessage: "Please try again later",
    });
  }
};

exports.getWithdraw = async (req, res) => {
  const userId = req.params.userId;
  try {
    const deposit = await Withdraw.findById(userId);
    console.log(deposit);

    res.json({ deposit });
  } catch (err) {
    console.log("err for getting single user controller.read", err);
    res.status(500).json({
      errorMessage: "Please try again later",
    });
  }
};
exports.updateWithdraw = async (req, res) => {
  const userId = req.params.userId;

  await Withdraw.findByIdAndUpdate(userId, req.body);

  res.json({
    successMessage: "user successfully updated",
  });
};

exports.getuser = async (req, res) => {
  const userId = req.params.userId;
  try {
    const user = await User.findById(userId);
    console.log(user);

    res.json({ user });
  } catch (err) {
    console.log("err for getting single user controller.read", err);
    res.status(500).json({
      errorMessage: "Please try again later",
    });
  }
};
exports.put = async (req, res) => {
  const userId = req.params.userId;

  await User.findByIdAndUpdate(userId, req.body);

  res.json({
    successMessage: "user successfully updated",
  });
};

exports.delete = async (req, res) => {
  try {
    const userId = req.params.userId;
    await User.findByIdAndDelete(userId);
  } catch (err) {
    console.log("err for user controller.delete", err);
    res.status(500).json({
      errorMessage: "Please try again later",
    });
  }
};
exports.deleteDeposit = async (req, res) => {
  try {
    const userId = req.params.userId;
    await Deposit.findByIdAndDelete(userId);
  } catch (err) {
    console.log("err for user controller.delete", err);
    res.status(500).json({
      errorMessage: "Please try again later",
    });
  }
};
exports.deleteWithdraw = async (req, res) => {
  try {
    const userId = req.params.userId;
    await Withdraw.findByIdAndDelete(userId);
  } catch (err) {
    console.log("err for user controller.delete", err);
    res.status(500).json({
      errorMessage: "Please try again later",
    });
  }
};
