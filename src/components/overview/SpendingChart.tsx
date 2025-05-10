
import React from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription
} from "@/components/ui/card";
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip
} from "recharts";

// Mock data for spending chart
const spendingData = [
  { date: "May 01", spending: 2400 },
  { date: "May 05", spending: 1398 },
  { date: "May 10", spending: 3200 },
  { date: "May 15", spending: 2900 },
  { date: "May 20", spending: 1800 },
  { date: "May 25", spending: 3800 },
  { date: "May 30", spending: 2400 },
];

const SpendingChart: React.FC = () => {
  return (
    <Card className="col-span-2 h-[400px]">
      <CardHeader>
        <CardTitle>Spending Breakdown</CardTitle>
        <CardDescription>Your spending activity over the last month</CardDescription>
      </CardHeader>
      <CardContent className="h-[320px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={spendingData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip 
              formatter={(value) => [`$${value}`, '']} 
              labelFormatter={(label) => `Date: ${label}`}
            />
            <Line
              type="monotone"
              dataKey="spending"
              stroke="#3B82F6"
              strokeWidth={2}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default SpendingChart;
