
import React from 'react';
import FinancialGoals from '@/components/insights/FinancialGoals';
import InsightCardWithPopup from '@/components/insights/InsightCardWithPopup';
import SubscriptionOptimization from '@/components/insights/SubscriptionOptimization';
import ChatBot from '@/components/insights/ChatBot';
import { Scissors, AlertTriangle } from 'lucide-react';
import { useRealData } from '@/hooks/useRealData';

const Insights: React.FC = () => {
  const { financialData } = useRealData();
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Financial Insights</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <FinancialGoals />
        
        <div className="space-y-4">
          {financialData.mcc_count > 0 && <InsightCardWithPopup 
            title="Subscription Optimization" 
            description = {`You could save ${financialData.subscription_value} monthly by optimizing your subscriptions. We found ${financialData.mcc_count} services you could consider cancelling`}
            icon={<Scissors />}
            color="#8B5CF6"
            buttonText="Optimize Now"
          >
            <SubscriptionOptimization />
          </InsightCardWithPopup>}
          
          <InsightCardWithPopup 
            title="Spending Anomaly" 
            description="We detected unusual spending in your dining category this month, 40% higher than your average."
            icon={<AlertTriangle />}
            color="#EF4444"
            buttonText="Review"
          >
            <div className="p-4">
              <p>Detailed spending anomaly information would be shown here.</p>
              <p className="mt-2">This is just a placeholder for now.</p>
            </div>
          </InsightCardWithPopup>
        </div>
      </div>
      
      <ChatBot />
    </div>
  );
};

export default Insights;
