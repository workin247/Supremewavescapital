const Withdraw = require("../models/withdraw");

exports.create = async (req, res) => {
  const {type, withdrawAmount, walletAddress, wallet } = req.body;
  const { _id } = req.user;

  try {
    let withdraw = new Withdraw();
    withdraw.user = _id;
    withdraw.type = type;
    withdraw.withdrawAmount = withdrawAmount;
    withdraw.walletAddress = walletAddress;
    withdraw.wallet = wallet;

    await withdraw.save();
    console.log(withdraw);
    res.json({
      successMessage: `Successful!!`,
      withdraw,
    });
  } catch (err) {
    console.log("err for withdraw controller", err);
    res.status(500).json({
      errorMessage: "Please try again later",
    });
  }
};

exports.get = async (req, res) => {
  try {
    const getHistory = await Withdraw.find({user: req.user._id });
    
    res.json({
      getHistory,
    });
  } catch (err) {
    console.log("err for history", err);
    res.status(500).json({
      errorMessage: "Please try again later",
    });
  }
};
