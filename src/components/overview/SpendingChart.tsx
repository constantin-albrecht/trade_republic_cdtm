
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
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Tooltip,
  Legend
} from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

// Updated interface for category spending data
interface CategorySpending {
  category: string;
  spending: number;
  fullMark: number;
}

interface SpendingChartProps {
  spendingData: any[]; // We'll ignore the props and use our mock data
}

const SpendingChart: React.FC<SpendingChartProps> = ({ spendingData }) => {
  // Mock spending category data
  const categorySpendingData: CategorySpending[] = [
    { category: 'Food & Dining', spending: 850, fullMark: 1000 },
    { category: 'Entertainment', spending: 420, fullMark: 1000 },
    { category: 'Shopping', spending: 650, fullMark: 1000 },
    { category: 'Transportation', spending: 380, fullMark: 1000 },
    { category: 'Utilities', spending: 520, fullMark: 1000 },
    { category: 'Travel', spending: 290, fullMark: 1000 },
  ];

  const chartConfig = {
    spending: {
      label: "Monthly Spending",
      theme: {
        light: "#3B82F6",
        dark: "#60A5FA"
      }
    },
    fullMark: {
      label: "Category Threshold",
      theme: {
        light: "#D1D5DB",
        dark: "#6B7280"
      }
    }
  };

  return (
    <Card className="col-span-2 h-[350px] w-full">
      <CardHeader className="pb-2">
        <CardTitle>Spending Breakdown</CardTitle>
        <CardDescription>Your spending across different categories</CardDescription>
      </CardHeader>
      <CardContent className="h-[280px]">
        <ChartContainer className="h-full" config={chartConfig}>
          <RadarChart data={categorySpendingData} margin={{ top: 10, right: 30, bottom: 10, left: 40 }}>
            <PolarGrid stroke="var(--color-fullMark)" />
            <PolarAngleAxis dataKey="category" tick={{ fill: "hsl(var(--foreground))", fontSize: 12 }} />
            <PolarRadiusAxis angle={30} domain={[0, 1000]} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Radar
              name="Spending"
              dataKey="spending"
              stroke="var(--color-spending)"
              fill="var(--color-spending)"
              fillOpacity={0.5}
            />
            <Legend />
          </RadarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default SpendingChart;
