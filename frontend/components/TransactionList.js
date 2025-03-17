// export default function TransactionList({ transactions, onDelete }) {
//     return (
//       <ul>
//         {transactions.map((tx) => (
//           <li key={tx._id}>
//             {tx.description} - ₹{tx.amount} - {new Date(tx.date).toLocaleDateString()}
//             <button onClick={() => onDelete(tx._id)}>Delete</button>
//           </li>
//         ))}
//       </ul>
//     );
//   }
  

import { useState } from "react";

export default function TransactionList({ transactions, onDelete, onUpdate }) {
    const [editId, setEditId] = useState(null);
    const [editDescription, setEditDescription] = useState("");
    const [editAmount, setEditAmount] = useState("");

    const handleEdit = (tx) => {
        setEditId(tx._id);
        setEditDescription(tx.description);
        setEditAmount(tx.amount);
    };

    const handleUpdate = () => {
        if (!editDescription || !editAmount) {
            return alert("Both fields are required for update!");
        }

        onUpdate(editId, { description: editDescription, amount: parseFloat(editAmount) });
        setEditId(null);
        setEditDescription("");
        setEditAmount("");
    };

    return (
        <ul>
            {transactions.map((tx) => (
                <li key={tx._id}>
                    {editId === tx._id ? (
                        <>
                            <input
                                type="text"
                                value={editDescription}
                                onChange={(e) => setEditDescription(e.target.value)}
                                placeholder="Description"
                            />
                            <input
                                type="number"
                                value={editAmount}
                                onChange={(e) => setEditAmount(e.target.value)}
                                placeholder="Amount"
                            />
                            <button onClick={handleUpdate}>Save</button>
                            <button onClick={() => setEditId(null)}>Cancel</button>
                        </>
                    ) : (
                        <>
                            {tx.description} - ₹{tx.amount} - {new Date(tx.date).toLocaleDateString()}
                            <button onClick={() => handleEdit(tx)}>Edit</button>
                            <button onClick={() => onDelete(tx._id)}>Delete</button>
                        </>
                    )}
                </li>
            ))}
        </ul>
    );
}
