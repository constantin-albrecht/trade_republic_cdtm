import { useState, useEffect } from 'react';
import { parseCSV } from '../utils/csvParser';

// Example CSV data for banking and trading activities
const BANKING_CSV = `date,description,amount,category
2025-05-01,Salary Deposit,5430,Income
2025-05-02,Rent Payment,-2000,Housing
2025-05-03,Grocery Store,-124.56,Groceries
2025-05-04,Electric Bill,-87.45,Utilities
2025-05-05,Restaurant Payment,-65.80,Dining
2025-05-07,Bonus Payment,1200,Income
2025-05-08,Internet Bill,-79.99,Utilities
2025-05-10,Gas Station,-45.67,Transportation`;

const TRADING_CSV = `date,type,symbol,shares,price,amount
2025-04-15,BUY,AAPL,10,175.25,-1752.5
2025-04-20,BUY,MSFT,5,410.34,-2051.7
2025-04-25,SELL,AAPL,3,182.45,547.35
2025-05-01,BUY,GOOGL,2,175.39,-350.78
2025-05-05,BUY,NVDA,8,95.67,-765.36
2025-05-08,SELL,MSFT,2,415.78,831.56`;

// Process the CSV data and calculate financial metrics
export const useFinancialData = () => {
  const [financialData, setFinancialData] = useState({
    balance: "$0.00",
    netWorth: "$0.00",
    monthlyIncome: "$0.00",
    monthlyExpenses: "$0.00",
    savingsRate: "0%",
    spendingData: [] as Array<{date: string, spending: number}>,
    recentTransactions: [] as Array<{
      id: string, 
      description: string, 
      amount: number, 
      date: string, 
      category: string
    }>,
    assets: {} as Record<string, { shares: number, averagePrice: number, currentValue: number }>
  });
  
  const [isConnected, setIsConnected] = useState(false);
  
  useEffect(() => {
    // Simulate API connection delay
    const connectAPI = async () => {
      console.log("Connecting to Trade Republic API...");
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log("Connected to Trade Republic API");
      setIsConnected(true);
      
      // Process the CSV data
      const bankingData = parseCSV(BANKING_CSV);
      const tradingData = parseCSV(TRADING_CSV);
      
      // Calculate available balance from banking transactions
      const initialBalance = 10000; // Starting balance assumption
      const balance = bankingData.reduce((total, transaction) => {
        return total + (transaction.amount as number);
      }, initialBalance);
      
      // Process trading data to get portfolio
      const portfolio: Record<string, { shares: number, totalCost: number }> = {};
      
      tradingData.forEach(trade => {
        const { type, symbol, shares, price, amount } = trade;
        
        if (!portfolio[symbol]) {
          portfolio[symbol] = { shares: 0, totalCost: 0 };
        }
        
        if (type === "BUY") {
          portfolio[symbol].shares += shares as number;
          portfolio[symbol].totalCost += Math.abs(amount as number);
        } else if (type === "SELL") {
          portfolio[symbol].shares -= shares as number;
          // Adjust cost basis proportionally when selling
          if (portfolio[symbol].shares > 0) {
            const sellRatio = (shares as number) / (portfolio[symbol].shares + (shares as number));
            portfolio[symbol].totalCost -= portfolio[symbol].totalCost * sellRatio;
          } else {
            portfolio[symbol].totalCost = 0;
          }
        }
      });
      
      // Mock current prices for assets
      const currentPrices: Record<string, number> = {
        AAPL: 185.92,
        MSFT: 420.45,
        GOOGL: 178.82,
        NVDA: 102.35
      };
      
      // Calculate assets with current values
      const assets: Record<string, { shares: number, averagePrice: number, currentValue: number }> = {};
      let portfolioValue = 0;
      
      Object.entries(portfolio).forEach(([symbol, { shares, totalCost }]) => {
        if (shares > 0) {
          const averagePrice = totalCost / shares;
          const currentPrice = currentPrices[symbol] || averagePrice; // Fallback if no current price
          const currentValue = shares * currentPrice;
          
          assets[symbol] = {
            shares,
            averagePrice,
            currentValue
          };
          
          portfolioValue += currentValue;
        }
      });
      
      // Calculate net worth (bank balance + portfolio value)
      const netWorth = balance + portfolioValue;
      
      // Calculate monthly income and expenses
      const incomeTransactions = bankingData.filter(t => (t.amount as number) > 0);
      const expenseTransactions = bankingData.filter(t => (t.amount as number) < 0);
      
      const monthlyIncome = incomeTransactions.reduce((sum, t) => sum + (t.amount as number), 0);
      const monthlyExpenses = Math.abs(expenseTransactions.reduce((sum, t) => sum + (t.amount as number), 0));
      
      // Calculate savings rate
      const savingsRate = monthlyIncome > 0 ? ((monthlyIncome - monthlyExpenses) / monthlyIncome) * 100 : 0;
      
      // Create spending data for chart
      const spendingData = bankingData
        .filter(t => (t.amount as number) < 0)
        .map(t => ({
          date: (t.date as string).substring(5), // Format as "MM-DD"
          spending: Math.abs(t.amount as number)
        }));
      
      // Format recent transactions
      const recentTransactions = bankingData.map((t, index) => ({
        id: `tx${index}`,
        description: t.description as string,
        amount: t.amount as number,
        date: t.date as string,
        category: t.category as string
      }));
      
      // Update financial data
      setFinancialData({
        balance: formatCurrency(balance),
        netWorth: formatCurrency(netWorth),
        monthlyIncome: formatCurrency(monthlyIncome),
        monthlyExpenses: formatCurrency(monthlyExpenses),
        savingsRate: `${savingsRate.toFixed(1)}%`,
        spendingData,
        recentTransactions,
        assets
      });
    };
    
    connectAPI();
  }, []);
  
  // Function to format currency values
  const formatCurrency = (amount: number): string => {
    return `$${amount.toLocaleString(undefined, { 
      minimumFractionDigits: 2, 
      maximumFractionDigits: 2 
    })}`;
  };
  
  // Parse currency string to number
  const parseCurrency = (currencyString: string): number => {
    return parseFloat(currencyString.replace(/[$,]/g, ''));
  };
  
  // Method to update balance after investment
  const updateBalance = (investmentAmount: number) => {
    setFinancialData(prev => {
      const currentBalance = parseCurrency(prev.balance);
      const newBalance = currentBalance - investmentAmount;
      
      // Add the investment transaction
      const newTransaction = {
        id: `tx${Date.now()}`,
        description: "Investment Purchase",
        amount: -investmentAmount,
        date: new Date().toISOString().split('T')[0],
        category: "Investment"
      };
      
      // Only keep the most recent transactions
      const updatedTransactions = [newTransaction, ...prev.recentTransactions].slice(0, 5);
      
      return {
        ...prev,
        balance: formatCurrency(newBalance),
        recentTransactions: updatedTransactions
      };
    });
  };
  
  // Get available balance as a number for validations
  const getAvailableBalance = (): number => {
    return parseCurrency(financialData.balance);
  };
  
  return {
    isConnected,
    financialData,
    updateBalance,
    getAvailableBalance
  };
};
