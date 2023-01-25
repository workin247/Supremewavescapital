const mongoose = require("mongoose");

const WithdrawSchema = mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
    },
    withdrawAmount: {
      type: String,
      required: true,
      trim: true
    },
    walletAddress: {
      type: String,
      required: true,
      trim: true
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
  { timestamps: true }
);

const Withdraw = mongoose.model("Withdraw", WithdrawSchema);

module.exports = Withdraw;
