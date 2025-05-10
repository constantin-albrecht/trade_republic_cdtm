
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription
} from "@/components/ui/card";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Mock data for financial goals
const goals = [
  {
    id: "g1",
    name: "Emergency Fund",
    target: 10000,
    current: 7500,
    percentage: 75,
    color: "#3B82F6" // Blue
  },
  {
    id: "g2",
    name: "Vacation",
    target: 5000,
    current: 2000,
    percentage: 40,
    color: "#10B981" // Green
  },
  {
    id: "g3",
    name: "New Car",
    target: 25000,
    current: 5000,
    percentage: 20,
    color: "#F59E0B" // Amber
  }
];

interface ProgressRingProps {
  percentage: number;
  color: string;
  size?: number;
  strokeWidth?: number;
}

const ProgressRing: React.FC<ProgressRingProps> = ({ 
  percentage, 
  color, 
  size = 120, 
  strokeWidth = 10 
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="progress-ring-container" style={{ width: size, height: size }}>
      <svg width={size} height={size}>
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke="#e5e7eb"
          strokeWidth={strokeWidth}
        />
        
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </svg>
      <div className="progress-ring-value text-lg font-bold">
        {percentage}%
      </div>
    </div>
  );
};

const FinancialGoals: React.FC = () => {
  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Financial Goals</CardTitle>
        <CardDescription>Track your progress towards your financial goals</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap justify-around gap-6">
          {goals.map((goal) => (
            <TooltipProvider key={goal.id}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex flex-col items-center">
                    <ProgressRing 
                      percentage={goal.percentage} 
                      color={goal.color} 
                    />
                    <h3 className="mt-3 font-medium">{goal.name}</h3>
                  </div>
                </TooltipTrigger>
                <TooltipContent side="top">
                  <div className="p-1">
                    <p className="font-medium">{goal.name}</p>
                    <p className="text-sm">Target: ${goal.target.toLocaleString()}</p>
                    <p className="text-sm">Current: ${goal.current.toLocaleString()}</p>
                    <p className="text-sm">Progress: {goal.percentage}%</p>
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default FinancialGoals;
