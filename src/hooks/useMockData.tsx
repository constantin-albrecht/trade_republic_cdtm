
import { useState, useEffect } from 'react';

// Mock data to simulate banking and trading data
const mockBankingData = {
  // Current account balance
  balance: "$14,752.36",
  // Net worth calculated from all assets
  netWorth: "$267,405.82",
  // Monthly data
  monthlyIncome: "$5,430.00",
  monthlyExpenses: "$2,245.75",
  savingsRate: "58.6%",
  // Daily spending data for chart
  spendingData: [
    { date: "May 01", spending: 245.50 },
    { date: "May 05", spending: 1245.80 },
    { date: "May 10", spending: 485.25 },
    { date: "May 15", spending: 1780.40 },
    { date: "May 20", spending: 320.15 },
    { date: "May 25", spending: 925.70 },
    { date: "May 30", spending: 542.90 },
  ],
  // Recent transactions
  recentTransactions: [
    { id: "tx1", description: "Grocery Store", amount: -124.56, date: "2025-05-09", category: "Groceries" },
    { id: "tx2", description: "Salary Deposit", amount: 2715.00, date: "2025-05-05", category: "Income" },
    { id: "tx3", description: "Electric Bill", amount: -87.45, date: "2025-05-04", category: "Utilities" },
    { id: "tx4", description: "Restaurant Payment", amount: -65.80, date: "2025-05-03", category: "Dining" },
    { id: "tx5", description: "Investment Dividend", amount: 340.25, date: "2025-05-01", category: "Investment" }
  ]
};

// Mock function to simulate connecting to the Trade Republic API
const connectToTradeRepublicAPI = async () => {
  console.log("Connecting to Trade Republic API...");
  // This would be replaced with actual API connection logic
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      console.log("Connected to Trade Republic API");
      resolve();
    }, 1000);
  });
};

export const useMockData = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [financialData, setFinancialData] = useState(mockBankingData);
  
  // Simulate API connection on component mount
  useEffect(() => {
    const connectAPI = async () => {
      await connectToTradeRepublicAPI();
      setIsConnected(true);
    };
    
    connectAPI();
  }, []);
  
  return {
    isConnected,
    financialData,
  };
};
