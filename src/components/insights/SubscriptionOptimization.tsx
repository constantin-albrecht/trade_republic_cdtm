
import React from 'react';
import { Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Mock data for subscriptions
const subscriptions = [
  {
    id: 's1',
    name: 'Netflix Premium',
    cost: 19.99,
    frequency: 'monthly',
    lastUsed: '2 days ago',
    recommend: 'keep'
  },
  {
    id: 's2',
    name: 'Spotify Family',
    cost: 14.99,
    frequency: 'monthly',
    lastUsed: '1 day ago',
    recommend: 'keep'
  },
  {
    id: 's3',
    name: 'Medium',
    cost: 10,
    frequency: 'monthly',
    lastUsed: '2 months ago',
    recommend: 'cancel'
  },
  {
    id: 's4',
    name: 'Adobe Creative Cloud',
    cost: 22.99,
    frequency: 'monthly',
    lastUsed: '3 months ago',
    recommend: 'cancel'
  },
  {
    id: 's5',
    name: 'YouTube Premium',
    cost: 11.99,
    frequency: 'monthly',
    lastUsed: '45 days ago',
    recommend: 'cancel'
  }
];

const potentialSavings = subscriptions
  .filter(sub => sub.recommend === 'cancel')
  .reduce((acc, sub) => acc + sub.cost, 0);

const SubscriptionOptimization: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="bg-finance-light-bg/50 p-4 rounded-lg">
        <h3 className="font-medium mb-2">Potential Monthly Savings</h3>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold text-finance-accent">${potentialSavings.toFixed(2)}</span>
          <span className="text-sm text-muted-foreground">per month</span>
        </div>
        <p className="text-sm mt-1">
          If you invest this amount in an ETF with 7% annual return, you could have <span className="font-medium">${(potentialSavings * 12 * 5 * 1.4).toFixed(2)}</span> in 5 years.
        </p>
      </div>

      <div>
        <h3 className="font-medium mb-2">Your Subscriptions</h3>
        <div className="space-y-3">
          {subscriptions.map(sub => (
            <div key={sub.id} className="flex items-center justify-between p-3 border rounded-lg bg-white">
              <div>
                <div className="font-medium">{sub.name}</div>
                <div className="text-sm text-muted-foreground">${sub.cost.toFixed(2)} {sub.frequency} • Last used {sub.lastUsed}</div>
              </div>
              <div className="flex items-center gap-2">
                {sub.recommend === 'cancel' ? (
                  <div className="px-2 py-1 bg-red-100 text-red-600 rounded-md text-xs font-medium">Recommended to Cancel</div>
                ) : (
                  <div className="px-2 py-1 bg-green-100 text-green-600 rounded-md text-xs font-medium">Keep</div>
                )}
                <Button variant="outline" size="sm">
                  <Check className="h-4 w-4 mr-1" />
                  Keep
                </Button>
                <Button variant="outline" size="sm" className="border-red-200 text-red-500 hover:bg-red-50">
                  <X className="h-4 w-4 mr-1" />
                  Cancel
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SubscriptionOptimization;
