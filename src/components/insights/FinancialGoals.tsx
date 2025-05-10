
import React from 'react';
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
    color: "#3B82F6", // Blue
    radius: 120 // Outer ring
  },
  {
    id: "g2",
    name: "Vacation",
    target: 5000,
    current: 2000,
    percentage: 40,
    color: "#10B981", // Green
    radius: 90 // Middle ring
  },
  {
    id: "g3",
    name: "New Car",
    target: 25000,
    current: 5000,
    percentage: 20,
    color: "#F59E0B", // Amber
    radius: 60 // Inner ring
  }
];

interface ProgressRingProps {
  percentage: number;
  color: string;
  size: number;
  strokeWidth?: number;
  label: string;
}

const ProgressRing: React.FC<ProgressRingProps> = ({ 
  percentage, 
  color, 
  size, 
  strokeWidth = 10,
  label
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="progress-ring-container" style={{ width: size, height: size, position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
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
        <div className="flex justify-center">
          <div className="relative h-[280px] w-[280px]">
            {goals.map((goal) => (
              <TooltipProvider key={goal.id}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div>
                      <ProgressRing 
                        percentage={goal.percentage} 
                        color={goal.color} 
                        size={goal.radius * 2}
                        label={goal.name}
                      />
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
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
              <div className="text-lg font-bold">Goals</div>
              <div className="text-sm text-muted-foreground">Progress</div>
            </div>
          </div>
        </div>
        <div className="flex justify-center gap-6 mt-8">
          {goals.map((goal) => (
            <div key={goal.id} className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: goal.color }}></div>
              <span className="text-sm font-medium">{goal.name}: {goal.percentage}%</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default FinancialGoals;
