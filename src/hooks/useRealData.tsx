import { useState, useEffect } from 'react';
import Papa from 'papaparse';

interface BankingTransaction {
  userId: string;
  bookingDate: string;
  side: 'CREDIT' | 'DEBIT';
  amount: number;
  currency: string;
  type: string;
  mcc?: string;
}

interface TradingTransaction {
  userId: string;
  executedAt: string;
  ISIN: string;
  direction: 'BUY' | 'SELL';
  executionSize: number;
  executionPrice: number;
  currency: string;
  executionFee: number;
  type: string;
}

interface FinancialData {
  balance: string;
  netWorth: string;
  monthlyIncome: string;
  monthlyExpenses: string;
  savingsRate: string;
  spendingData: Array<{ date: string; spending: number }>;
  recentTransactions: Array<{
    id: string;
    description: string;
    amount: number;
    date: string;
    category: string;
  }>;
}

const formatCurrency = (amount: number): string => {
  return `$${amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};

export const useRealData = () => {
  const [financialData, setFinancialData] = useState<FinancialData>({
    balance: '0.00',
    netWorth: '0.00',
    monthlyIncome: '$0.00',
    monthlyExpenses: '$0.00',
    savingsRate: '0%',
    spendingData: [],
    recentTransactions: []
  });

  useEffect(() => {
    const processData = async () => {
      try {
        // Load banking data
        console.log('Attempting to load banking data...');
        const bankingResponse = await fetch('/banking_sample_data.csv');
        console.log('Banking response status:', bankingResponse.status);
        console.log('Banking response headers:', Object.fromEntries(bankingResponse.headers.entries()));
        
        if (!bankingResponse.ok) {
          throw new Error(`Failed to load banking data: ${bankingResponse.status} ${bankingResponse.statusText}`);
        }
        const bankingText = await bankingResponse.text();
        console.log('Banking data loaded:', bankingText.substring(0, 200) + '...'); // Log first 200 chars
        
        const bankingResult = Papa.parse<BankingTransaction>(bankingText, {
          header: true,
          dynamicTyping: true
        });
        console.log('Parsed banking data:', bankingResult.data.length, 'transactions');

        // Load trading data
        console.log('Attempting to load trading data...');
        const tradingResponse = await fetch('/trading_sample_data.csv');
        console.log('Trading response status:', tradingResponse.status);
        console.log('Trading response headers:', Object.fromEntries(tradingResponse.headers.entries()));
        
        if (!tradingResponse.ok) {
          throw new Error(`Failed to load trading data: ${tradingResponse.status} ${tradingResponse.statusText}`);
        }
        const tradingText = await tradingResponse.text();
        console.log('Trading data loaded:', tradingText.substring(0, 200) + '...'); // Log first 200 chars
        
        const tradingResult = Papa.parse<TradingTransaction>(tradingText, {
          header: true,
          dynamicTyping: true
        });
        console.log('Parsed trading data:', tradingResult.data.length, 'transactions');


        let netWorth = 0;

        // Calculate balance from banking transactions
        let balance = 0;
        const transactions: Array<{
          id: string;
          description: string;
          amount: number;
          date: string;
          category: string;
        }> = [];

        

        bankingResult.data.forEach(tx => {
        const amount = tx.side === 'CREDIT' ? tx.amount : -tx.amount;
          if (tx.userId === '13afc351-1b0e-423c-93d7-f76d9813c63c') {
            console.log('I AM: ', tx.userId, 'IT IS A ', tx.side, 'AND I HAVE THIS AMOUNT: ', amount);
            balance += amount;
            console.log('I AM: ', tx.userId, 'AND I HAVE THIS BALANCE: ', balance);
          }
          
          // Add to recent transactions
          transactions.push({
            id: `${tx.userId}-${tx.bookingDate}`,
            description: tx.type,
            amount,
            date: tx.bookingDate,
            category: tx.type
          });
        });

        // Not needed because the banking csv already includes the trading data!!!
        /* tradingResult.data.forEach(tx => {
            if (tx.userId === '13afc351-1b0e-423c-93d7-f76d9813c63c') {
                const positionValue = tx.executionSize * tx.executionPrice;
                if (tx.direction === 'BUY') {
                    balance -= (positionValue + tx.executionFee);
                } else {
                    balance += positionValue;
                }
            }
        }); */
        balance += 5000; 

    
        let monthlyIncome = 0;
        let monthlyExpenses = 0;
        let sum = 0;
        let expenses = 0;
        bankingResult.data.forEach(tx => {
            // bookingDate is a string in the format YYYY-MM-DD
            const startDate = new Date("2024-06-01");
            const endDate = new Date("2024-06-30");
            const date = new Date(tx.bookingDate);
            if (tx.userId === '13afc351-1b0e-423c-93d7-f76d9813c63c' && date >= startDate && date <= endDate && tx.side === 'CREDIT') {
                sum += tx.amount;
                console.log('YES');
            } else if (tx.userId === '13afc351-1b0e-423c-93d7-f76d9813c63c' && date >= startDate && date <= endDate) {
                expenses += tx.amount;
            }
        });
        monthlyIncome = sum;
        monthlyExpenses = expenses;



        const now = new Date();
        const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        
        const monthlyTransactions = bankingResult.data.filter(tx => 
          new Date(tx.bookingDate) >= firstDayOfMonth
        );


        const savingsRate = monthlyIncome > 0 
          ? ((monthlyIncome - monthlyExpenses) / monthlyIncome * 100).toFixed(1)
          : '0'; 

        // Generate spending data for the chart
        const spendingData = Array.from({ length: 30 }, (_, i) => {
          const date = new Date(now);
          date.setDate(date.getDate() - i);
          const dateStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
          
          const daySpending = bankingResult.data
            .filter(tx => 
              tx.side === 'DEBIT' && 
              new Date(tx.bookingDate).toDateString() === date.toDateString()
            )
            .reduce((sum, tx) => sum + tx.amount, 0);

          return { date: dateStr, spending: daySpending };
        }).reverse();

        setFinancialData({
          balance: formatCurrency(balance),
          netWorth: netWorth.toString(),
          monthlyIncome: formatCurrency(monthlyIncome),
          monthlyExpenses: formatCurrency(monthlyExpenses),
          savingsRate: `${savingsRate}%`,
          spendingData,
          recentTransactions: transactions.slice(0, 5)
        });
      } catch (error) {
        console.error('Error processing CSV data:', error);
      }
    };

    processData();
  }, []);

  return { financialData };
}; 