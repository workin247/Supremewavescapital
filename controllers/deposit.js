const Deposit = require("../models/deposit");

exports.create = async (req, res) => {
  const { type, investment, plan, amount, wallet } = req.body;
  const { _id } = req.user;
  try {
    let deposit = new Deposit();
    deposit.user = _id;
    deposit.type = type;
    deposit.investment = investment;
    deposit.plan = plan;
    deposit.amount = amount;
    deposit.wallet = wallet;

    await deposit.save();
    console.log(deposit);
    res.json({
      successMessage: `Successful!!`,
      deposit,
    });
  } catch (err) {
    console.log("err for deposit controller", err);
    res.status(500).json({
      errorMessage: "Please try again later",
    });
  }
};

exports.get = async (req, res) => {
  try {
    const getHistory = await Deposit.find({ user: req.user._id });
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
