
import React from 'react';
import { format } from "date-fns";
import StatCard from '@/components/overview/StatCard';
import SpendingChart from '@/components/overview/SpendingChart';
import RecentTransactions from '@/components/overview/RecentTransactions';
import { Wallet, TrendingUp, TrendingDown, PiggyBank } from 'lucide-react';
import { useRealData } from '@/hooks/useRealData';

const Overview: React.FC = () => {
  // Mock data for username
  const username = "Thomas";
  const today = format(new Date(), "MMMM d, yyyy");
  
  // Get financial data from our mock service
  const { financialData } = useRealData();
  
  return (
    <div className="space-y-6 w-full">
      <div className="w-full ">
        <h1 className="text-3xl font-bold tracking-tight mb-1">Welcome back, {username}<span style={{ display: "inline-block", width: "900px" }}></span></h1>
        
        <p className="text-muted-foreground mt-1">
          Here's your financial overview for {today}
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
        <StatCard 
          title="Total Balance" 
          value={financialData.balance} 
          icon={<Wallet />}
          trend={{ value: 2.5, isPositive: true }}
        />
        <StatCard 
          title="Monthly Income" 
          value={financialData.monthlyIncome} 
          icon={<TrendingUp />}
          trend={{ value: 1.2, isPositive: true }}
        />
        <StatCard 
          title="Monthly Expenses" 
          value={financialData.monthlyExpenses} 
          icon={<TrendingDown />}
          trend={{ value: 0.8, isPositive: false }}
        />
        <StatCard 
          title="Savings Rate" 
          value={financialData.savingsRate} 
          icon={<PiggyBank />}
          trend={{ value: 3.2, isPositive: true }}
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 w-full">
        <SpendingChart spendingData={financialData.spendingData} />
        <RecentTransactions transactions={financialData.recentTransactions} />
      </div>
    </div>
  );
};

export default Overview;
