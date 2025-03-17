// const mongoose = require("mongoose");

// const transactionSchema = new mongoose.Schema({
//   amount: Number,
//   description: String,
//   date: Date,
// });

// module.exports = mongoose.model("Transaction", transactionSchema);
//stage2

const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  amount: Number,
  description: String,
  date: Date,
  category: {
    type: String,
    enum: ["Food", "Transport", "Entertainment", "Health", "Bills", "Others"],
    required: true,
  },
});

module.exports = mongoose.model("Transaction", transactionSchema);
