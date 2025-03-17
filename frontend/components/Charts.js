// import { BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";

// export default function Charts({ data }) {
//   return (
//     <BarChart width={500} height={300} data={data}>
//       <XAxis dataKey="month" />
//       <YAxis />
//       <Tooltip />
//       <Bar dataKey="amount" fill="#8884d8" />
//     </BarChart>
//   );
// }


//stage2


import { PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis } from "recharts";

export function CategoryPieChart({ data }) {
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AA336A", "#D93636"];

  return (
    <PieChart width={400} height={300}>
      <Pie data={data} dataKey="total" nameKey="_id" cx="50%" cy="50%" outerRadius={100} fill="#8884d8" label>
        {data.map((_, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
    </PieChart>
  );
}
export function MonthlyBarChart({ data }) {
    return (
      <BarChart width={500} height={300} data={data}>
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="amount" fill="#8884d8" />
      </BarChart>
    );
  }
  