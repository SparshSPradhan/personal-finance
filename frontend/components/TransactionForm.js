// import { useState } from "react";
// import api from "../utils/api";

// export default function TransactionForm({ fetchTransactions }) {
//   const [amount, setAmount] = useState("");
//   const [description, setDescription] = useState("");
//   const [date, setDate] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!amount || !description || !date) return alert("All fields are required");

//     await api.post("/", { amount, description, date });
//     fetchTransactions();
//     setAmount("");
//     setDescription("");
//     setDate("");
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4">
//       <input value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Amount" type="number" required />
//       <input value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" required />
//       <input value={date} onChange={(e) => setDate(e.target.value)} type="date" required />
//       <button type="submit">Add Transaction</button>
//     </form>
//   );
// }



//stage2

import { useState } from "react";
import api from "../utils/api";

const categories = ["Food", "Transport", "Entertainment", "Health", "Bills", "Others"];

export default function TransactionForm({ fetchTransactions }) {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState(categories[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post("/", { amount, description, date, category });
    fetchTransactions();
    setAmount("");
    setDescription("");
    setDate("");
    setCategory(categories[0]);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Amount" type="number" required />
      <input value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" required />
      <input value={date} onChange={(e) => setDate(e.target.value)} type="date" required />
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        {categories.map((cat) => (
          <option key={cat}>{cat}</option>
        ))}
      </select>
      <button type="submit">Add Transaction</button>
    </form>
  );
}