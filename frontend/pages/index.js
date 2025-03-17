
import { useEffect, useState } from "react";
import api from "../utils/api";
import TransactionForm from "../components/TransactionForm";
import TransactionList from "../components/TransactionList";
import BudgetForm from "../components/BudgetForm";
import { BudgetComparisonChart } from "../components/BudgetComparisonChart";
import Insights from "../components/Insights";
import { CategoryPieChart, MonthlyBarChart } from "../components/Charts";


export default function Home() {
  const [transactions, setTransactions] = useState([]);
  const [summary, setSummary] = useState({});
  const [budgets, setBudgets] = useState([]);

  // --- Fetch Transactions & Summary ---
  const fetchTransactions = async () => {
    try {
      const res = await api.get("/");
      setTransactions(res.data);

      const summaryRes = await api.get("/summary");
      setSummary(summaryRes.data);
      const budgetRes = await api.get("/budgets");
      setBudgets(budgetRes.data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  // --- Delete Transaction ---
  const handleDeleteTransaction = async (id) => {
    try {
      await api.delete(`/${id}`);
      fetchTransactions(); // Refresh after deletion
    } catch (error) {
      console.error("Error deleting transaction:", error);
    }
  };

  // --- Update Transaction ---
  const handleUpdateTransaction = async (id, updatedData) => {
    try {
      await api.put(`/${id}`, updatedData); // Update the transaction
      fetchTransactions(); // Refresh after update
    } catch (error) {
      console.error("Error updating transaction:", error);
    }
  };

  // --- Add Budget ---
  const addBudget = (budget) => {
    // setBudgets([...budgets, budget]);
    fetchTransactions()
    // setSummary(Array.from(summary));
  };

  useEffect(() => {
    fetchTransactions(); // Initial fetch
  }, []);

//   const budgetComparisonData = summary.categoryBreakdown?.map((item) => {
//     const budgetItem = budgets.find((b) => b.category === item.category);


//     return {
//       category: item.category,
//       actual: item.total,
//       budget: budgetItem ? budgetItem.budget : 0,
//     };
//   }) || [];

const [budgetComparisonData, setBudgetComparisonData] = useState([]);

useEffect(() => {
    console.log(JSON.stringify(budgets));
    console.log(JSON.stringify(summary));

  setBudgetComparisonData(
    summary.categoryBreakdown?.map((item) => {
        console.log(JSON.stringify(item));

      const budgetItem = budgets.find((b) => b.category.toLowerCase() === item.category?.toLowerCase());
      console.log(JSON.stringify(budgetItem));

      return {
        category: item.category,
        actual: item.total,
        budget: budgetItem ? budgetItem.amount : 0,
      };
    }) || []
  );
}, [budgets, summary.categoryBreakdown]);


  return (
    <div>
      <TransactionForm fetchTransactions={fetchTransactions} />

      <h2>Total Expenses: ₹{summary.totalExpenses}</h2>

      <Insights summary={summary} />

      <CategoryPieChart data={summary.categoryBreakdown || []} />

      <MonthlyBarChart 
        data={transactions.map((t) => ({
          month: new Date(t.date).toLocaleString("default", { month: "short" }), 
          amount: t.amount 
        }))} 
      />

      <BudgetForm onBudgetAdded={addBudget} />

      <h3>Budget vs Actual Comparison</h3>
      <BudgetComparisonChart data={budgetComparisonData} />

      <h3>Recent Transactions</h3>
      <TransactionList 
        transactions={transactions}
        onDelete={handleDeleteTransaction}
        onUpdate={handleUpdateTransaction}
      />
    </div>
  );
}

