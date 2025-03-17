// import { useEffect, useState } from "react";
// import api from "../utils/api";

// export default function Insights({ month }) {
//   const [insights, setInsights] = useState(null);

//   useEffect(() => {
//     const fetchInsights = async () => {
//       const res = await api.get(`/insights/${month}`);
//       setInsights(res.data);
//     };
//     fetchInsights();
//   }, [month]);

//   return insights ? (
//     <div>
//       <p>Total Categories: {insights.totalCategories}</p>
//       <p>Highest Spending: {insights.highestSpending._id} - ₹{insights.highestSpending.total}</p>
//       <p>Lowest Spending: {insights.lowestSpending._id} - ₹{insights.lowestSpending.total}</p>
//     </div>
//   ) : (
//     <p>Loading insights...</p>
//   );
// }
export default function Insights({ summary }) {
    return (
      <div>
        <h3>Spending Insights</h3>
        <p>Total Expenses: ₹{summary.totalExpenses}</p>
        <p>Total Categories: {summary.categoryBreakdown?.length || 0}</p>
      </div>
    );
  }
  