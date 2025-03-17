



// const express = require("express");
// const router = express.Router();
// const Transaction = require("../models/Transaction");
// const Budget = require("../models/Budget");


// // --- Create a New Transaction ---
// router.post("/", async (req, res) => {
//     const { amount, description, date, category } = req.body;
//     try {
//       const newTransaction = await Transaction.create({
//         amount,
//         description,
//         date,
//         category,
//       });
//       res.status(201).json(newTransaction);
//     } catch (error) {
//       console.error("Error adding transaction:", error);
//       res.status(500).json({ message: "Server error while adding transaction." });
//     }
//   });
  
// // --- Fetch All Transactions ---
// router.get("/", async (req, res) => {
//   try {
//     const transactions = await Transaction.find().sort({ date: -1 });
//     res.json(transactions);
//   } catch (error) {
//     console.error("Error fetching transactions:", error);
//     res.status(500).json({ message: "Server error while fetching transactions." });
//   }
// });

// // --- Get Summary (Total Expenses & Category Breakdown) ---
// router.get("/summary", async (req, res) => {
//   try {
//     const totalExpensesResult = await Transaction.aggregate([
//       { $group: { _id: null, total: { $sum: "$amount" } } },
//     ]);
//     const totalExpenses = totalExpensesResult[0]?.total || 0;

//     const categoryBreakdownResult = await Transaction.aggregate([
//       { $group: { _id: "$category", total: { $sum: "$amount" } } },
//     ]);
//     const categoryBreakdown = categoryBreakdownResult.map((item) => ({
//       category: item._id,
//       total: item.total,
//     }));

//     const recentTransactions = await Transaction.find()
//       .sort({ date: -1 })
//       .limit(5);

//     res.json({
//       totalExpenses,
//       categoryBreakdown,
//       recentTransactions,
//     });
//   } catch (error) {
//     console.error("Error fetching summary:", error);
//     res.status(500).json({ message: "Server error while fetching summary." });
//   }
// });

// // --- Delete a Transaction ---
// router.delete("/:id", async (req, res) => {
//   try {
//     const deleted = await Transaction.findByIdAndDelete(req.params.id);
//     if (!deleted) {
//       return res.status(404).json({ message: "Transaction not found." });
//     }
//     res.json({ message: "Transaction deleted successfully." });
//   } catch (error) {
//     console.error("Error deleting transaction:", error);
//     res.status(500).json({ message: "Server error while deleting transaction." });
//   }
// });
// // --- Update a Transaction ---
// router.put("/:id", async (req, res) => {
//     const { description, amount } = req.body;
//     try {
//         const updated = await Transaction.findByIdAndUpdate(
//             req.params.id,
//             { description, amount },
//             { new: true }
//         );

//         if (!updated) {
//             return res.status(404).json({ message: "Transaction not found." });
//         }

//         res.json({ message: "Transaction updated successfully.", transaction: updated });
//     } catch (error) {
//         console.error("Error updating transaction:", error);
//         res.status(500).json({ message: "Server error while updating transaction." });
//     }
// });
// // Update transaction by ID
// router.put("/:id", async (req, res) => {
//     const { description, amount } = req.body;
//     try {
//         const updatedTransaction = await Transaction.findByIdAndUpdate(
//             req.params.id,
//             { description, amount },
//             { new: true }
//         );

//         if (!updatedTransaction) {
//             return res.status(404).json({ message: "Transaction not found." });
//         }

//         res.json({ message: "Transaction updated successfully.", transaction: updatedTransaction });
//     } catch (error) {
//         console.error("Error updating transaction:", error);
//         res.status(500).json({ message: "Server error while updating transaction." });
//     }
// });


// // --- Create or Update Budget ---
// // router.post("/budget", async (req, res) => {
// //   const { category, amount, month } = req.body;
// //   try {
// //     const existingBudget = await Budget.findOne({ category, month });

// //     if (existingBudget) {
// //       existingBudget.amount = amount;
// //       await existingBudget.save();
// //       res.json({ message: "Budget updated successfully." });
// //     } else {
// //       await Budget.create({ category, amount, month });
// //       res.json({ message: "Budget created successfully." });
// //     }
// //   } catch (error) {
// //     console.error("Error saving budget:", error);
// //     res.status(500).json({ message: "Server error while saving budget." });
// //   }
// // });

// // --- Fetch Budget vs Actual ---
// // router.get("/budget-summary/:month", async (req, res) => {
// //   const { month } = req.params;
// //   try {
// //     const budgets = await Budget.find({ month });
// //     const expenses = await Transaction.aggregate([
// //       { $match: { date: { $regex: `^${month}` } } },
// //       { $group: { _id: "$category", total: { $sum: "$amount" } } },
// //     ]);

// //     const summary = budgets.map((budget) => {
// //       const expense = expenses.find((e) => e._id === budget.category);
// //       return {
// //         category: budget.category,
// //         budget: budget.amount,
// //         actual: expense?.total || 0,
// //       };
// //     });

// //     res.json(summary);
// //   } catch (error) {
// //     console.error("Error fetching budget summary:", error);
// //     res.status(500).json({ message: "Server error while fetching summary." });
// //   }
// // });




// // --- Create or Update Budget ---
// // router.post("/budget", async (req, res) => {
// //     const { category, budget, month } = req.body;
// //     try {
// //       const existingBudget = await Budget.findOne({ category, month });
  
// //       if (existingBudget) {
// //         existingBudget.budget = budget;
// //         await existingBudget.save();
// //         res.json({ message: "Budget updated successfully." });
// //       } else {
// //         await Budget.create({ category, budget, month });
// //         res.json({ message: "Budget created successfully." });
// //       }
// //     } catch (error) {
// //       console.error("Error saving budget:", error);
// //       res.status(500).json({ message: "Server error while saving budget." });
// //     }
// //   });

// app.post('/budget', async (req, res) => {
//     try {
//       const { category, amount, month } = req.body;
  
//       // Ensure the amount is present and valid
//       if (!amount || isNaN(amount)) {
//         return res.status(400).json({ message: "Amount is required and must be a number." });
//       }
  
//       const newBudget = new Budget({
//         category,
//         amount,
//         month,
//       });
  
//       await newBudget.save();
//       res.status(201).json(newBudget);
//     } catch (error) {
//       console.error("Error saving budget:", error);
//       res.status(500).json({ message: "Error saving budget", error: error.message });
//     }
//   });s
  
//   // --- Fetch Budget vs Actual ---
//   router.get("/budget-summary/:month", async (req, res) => {
//     const { month } = req.params;
//     try {
//       const budgets = await Budget.find({ month });
//       const expenses = await Transaction.aggregate([
//         { $match: { date: { $regex: `^${month}` } } },
//         { $group: { _id: "$category", total: { $sum: "$amount" } } },
//       ]);
  
//       const summary = budgets.map((budget) => {
//         const expense = expenses.find((e) => e._id === budget.category);
//         return {
//           category: budget.category,
//           budget: budget.budget,
//           actual: expense?.total || 0,
//         };
//       });
  
//       res.json(summary);
//     } catch (error) {
//       console.error("Error fetching budget summary:", error);
//       res.status(500).json({ message: "Server error while fetching summary." });
//     }
//   });
  
// // --- Simple Spending Insights ---
// router.get("/insights/:month", async (req, res) => {
//   const { month } = req.params;
//   try {
//     const expenses = await Transaction.aggregate([
//       { $match: { date: { $regex: `^${month}` } } },
//       { $group: { _id: "$category", total: { $sum: "$amount" } } },
//     ]);

//     const highestSpending = expenses.reduce((max, item) => (item.total > max.total ? item : max), { total: 0 });
//     const lowestSpending = expenses.reduce((min, item) => (item.total < min.total ? item : min), { total: Infinity });

//     res.json({
//       totalCategories: expenses.length,
//       highestSpending,
//       lowestSpending,
//     });
//   } catch (error) {
//     console.error("Error fetching insights:", error);
//     res.status(500).json({ message: "Server error while fetching insights." });
//   }
// });

// module.exports = router;



const express = require("express");
const router = express.Router();
const Transaction = require("../models/Transaction");
const Budget = require("../models/Budget");

// --- Create a New Transaction ---
router.post("/", async (req, res) => {
  const { amount, description, date, category } = req.body;
  try {
    const newTransaction = await Transaction.create({
      amount,
      description,
      date,
      category,
    });
    res.status(201).json(newTransaction);
  } catch (error) {
    console.error("Error adding transaction:", error);
    res.status(500).json({ message: "Server error while adding transaction." });
  }
});

// --- Fetch All Transactions ---
router.get("/", async (req, res) => {
  try {
    const transactions = await Transaction.find().sort({ date: -1 });

    res.json(transactions);
  } catch (error) {
    console.error("Error fetching transactions:", error);
    res.status(500).json({ message: "Server error while fetching transactions." });
  }
});

// --- Get Summary (Total Expenses & Category Breakdown) ---
router.get("/summary", async (req, res) => {
  try {
    const totalExpensesResult = await Transaction.aggregate([
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);
    const totalExpenses = totalExpensesResult[0]?.total || 0;

    const categoryBreakdownResult = await Transaction.aggregate([
      { $group: { _id: "$category", total: { $sum: "$amount" } } },
    ]);
    const categoryBreakdown = categoryBreakdownResult.map((item) => ({
      category: item._id,
      total: item.total,
    }));

    const recentTransactions = await Transaction.find()
      .sort({ date: -1 })
      .limit(5);

    res.json({
      totalExpenses,
      categoryBreakdown,
      recentTransactions,
    });
  } catch (error) {
    console.error("Error fetching summary:", error);
    res.status(500).json({ message: "Server error while fetching summary." });
  }
});

// --- Delete a Transaction ---
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Transaction.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Transaction not found." });
    }
    res.json({ message: "Transaction deleted successfully." });
  } catch (error) {
    console.error("Error deleting transaction:", error);
    res.status(500).json({ message: "Server error while deleting transaction." });
  }
});

// --- Update a Transaction ---
router.put("/:id", async (req, res) => {
  const { description, amount, date, category } = req.body;
  try {
    const updatedTransaction = await Transaction.findByIdAndUpdate(
      req.params.id,
      { description, amount, date, category },
      { new: true }
    );

    if (!updatedTransaction) {
      return res.status(404).json({ message: "Transaction not found." });
    }

    res.json({
      message: "Transaction updated successfully.",
      transaction: updatedTransaction,
    });
  } catch (error) {
    console.error("Error updating transaction:", error);
    res.status(500).json({ message: "Server error while updating transaction." });
  }
});

// --- Create or Update Budget ---
router.post("/budget", async (req, res) => {
  const { category, amount, month } = req.body;
  try {
    const existingBudget = await Budget.findOne({ category, month });

    if (existingBudget) {
      existingBudget.amount = amount;
      await existingBudget.save();
      res.json({ message: "Budget updated successfully." });
    } else {
      const newBudget = new Budget({ category, amount, month });
      await newBudget.save();
      res.status(201).json(newBudget);
    }
  } catch (error) {
    console.error("Error saving budget:", error);
    res.status(500).json({ message: "Server error while saving budget." });
  }
});





router.get("/budgets", async (req, res) => {
    try {
      const budgets = await Budget.find(); // Fetch all budget entries
      res.json(budgets);
    } catch (error) {
      console.error("Error fetching budgets:", error);
      res.status(500).json({ message: "Server error while fetching budgets." });
    }
  });




  

// --- Fetch Budget vs Actual ---
router.get("/budget-summary/:month", async (req, res) => {
  const { month } = req.params;
  try {
    const budgets = await Budget.find({ month });
    const expenses = await Transaction.aggregate([
      { $match: { date: { $regex: `^${month}` } } },
      { $group: { _id: "$category", total: { $sum: "$amount" } } },
    ]);

    const summary = budgets.map((budget) => {
      const expense = expenses.find((e) => e._id === budget.category);
      return {
        category: budget.category,
        budget: budget.amount,
        actual: expense?.total || 0,
      };
    });
    res.json(summary);
  } catch (error) {
    console.error("Error fetching budget summary:", error);
    res.status(500).json({ message: "Server error while fetching summary." });
  }
});

// --- Simple Spending Insights ---
router.get("/insights/:month", async (req, res) => {
  const { month } = req.params;
  try {
    const expenses = await Transaction.aggregate([
      { $match: { date: { $regex: `^${month}` } } },
      { $group: { _id: "$category", total: { $sum: "$amount" } } },
    ]);

    const highestSpending = expenses.reduce(
      (max, item) => (item.total > max.total ? item : max),
      { total: 0 }
    );
    const lowestSpending = expenses.reduce(
      (min, item) => (item.total < min.total ? item : min),
      { total: Infinity }
    );

    res.json({
      totalCategories: expenses.length,
      highestSpending,
      lowestSpending,
    });
  } catch (error) {
    console.error("Error fetching insights:", error);
    res.status(500).json({ message: "Server error while fetching insights." });
  }
});

module.exports = router;
