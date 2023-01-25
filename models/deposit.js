const mongoose = require("mongoose");

const DepositSchema = mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
    },
    investment: {
      type: String,
      required: true,
    },
    plan: {
      type: String,
      required: true
    },
    amount: {
      type: Number,
      required: true,
    },
    wallet: {
      type: String,
      required: true
    },
    status: {
      type: String,
      default: "Pending",
    },
    user:{
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
  },
  },
  { timestamps: true
   }
);

const Deposit = mongoose.model("Deposit", DepositSchema);

module.exports = Deposit;
