



import { useState } from "react";
import api from "../utils/api";

export default function BudgetForm({ onBudgetAdded }) {
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [month, setMonth] = useState(() => new Date().toISOString().slice(0, 7)); // Default to current month

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!category || !amount) {
      return alert("All fields are required!");
    }

    // Make sure the amount is a valid number
    const newBudget = {
      category,
      amount: parseFloat(amount), // Use 'amount' instead of 'budget'
      month,
    };

    if (isNaN(newBudget.amount) || !category) {
      return alert("All fields are required and 'Amount' must be a valid number!");
    }

    try {
      // Persist budget to backend
      await api.post("/budget", newBudget);

      // Update state in parent
      onBudgetAdded(newBudget);

      // Reset form fields
      setCategory("");
      setAmount("");
    } catch (error) {
      console.error("Error adding budget:", error.response?.data || error.message);
      alert("Failed to add budget. Try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        value={category} 
        onChange={(e) => setCategory(e.target.value)} 
        placeholder="Category" 
      />
      <input 
        type="number" 
        value={amount} 
        onChange={(e) => setAmount(e.target.value)} 
        placeholder="Amount" 
      />
      <input 
        type="month"
        value={month}
        onChange={(e) => setMonth(e.target.value)}
      />
      <button type="submit">Set Budget</button>
    </form>
  );
}