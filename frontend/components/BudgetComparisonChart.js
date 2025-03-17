import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

export function BudgetComparisonChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <XAxis dataKey="category" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="budget" fill="#8884d8" name="Budget" />
        <Bar dataKey="actual" fill="#82ca9d" name="Actual Spending" />
      </BarChart>
    </ResponsiveContainer>
  );
}
