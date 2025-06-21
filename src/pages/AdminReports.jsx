import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Food", donations: 12 },
  { name: "Books", donations: 9 },
  { name: "Clothes", donations: 15 },
  { name: "Toys", donations: 5 },
];

const AdminReports = () => {
  return (
    <div>
      <h1>Admin Reports</h1>
      <p>Donation statistics:</p>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <CartesianGrid stroke="#ccc" />
          <Bar dataKey="donations" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AdminReports;
