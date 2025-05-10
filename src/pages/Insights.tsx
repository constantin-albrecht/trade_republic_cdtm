
import React from 'react';
import FinancialGoals from '@/components/insights/FinancialGoals';
import InsightCard from '@/components/insights/InsightCard';
import ChatBot from '@/components/insights/ChatBot';
import { Scissors, AlertTriangle } from 'lucide-react';

const Insights: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Financial Insights</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <FinancialGoals />
        
        <div className="space-y-4">
          <InsightCard 
            title="Subscription Optimization" 
            description="You could save $45 monthly by optimizing your subscriptions. We found 3 services you barely use."
            icon={<Scissors />}
            color="#8B5CF6"
          />
          
          <InsightCard 
            title="Spending Anomaly" 
            description="We detected unusual spending in your dining category this month, 40% higher than your average."
            icon={<AlertTriangle />}
            color="#EF4444"
            buttonText="Review"
          />
        </div>
      </div>
      
      <ChatBot />
    </div>
  );
};

export default Insights;
