
import React from 'react';
import { useRealData } from '@/hooks/useRealData';


const SubscriptionOptimization: React.FC = () => {
  const { financialData } = useRealData();
  return (
    <div className="space-y-6">
      <div className="bg-finance-light-bg/50 p-4 rounded-lg">
        <h3 className="font-medium mb-2">Potential Monthly Savings</h3>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold text-finance-accent">{financialData.subscription_value}</span>
          <span className="text-sm text-muted-foreground">per month</span>
        </div>
        <p className="text-sm mt-1">
          If you invest this amount in an ETF with 7% annual return, you could have <span className="font-medium">${(parseFloat(financialData.subscription_value.replace('$', ''))* 12 * 5 * 1.4).toFixed(2)}</span> in 5 years.
        </p>
      </div>
    </div>
  );
};

export default SubscriptionOptimization;
