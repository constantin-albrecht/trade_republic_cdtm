import React from 'react';
import { useRealData } from '@/hooks/useRealData';


const Anomalies: React.FC = () => {
  const { financialData } = useRealData();
  const thisMonth = financialData.monthlyExpenses;
  const prevMonth = financialData.prevMonthExpenses;
  const parseExpense = (expense: string) => parseFloat(expense.replace('$', '').replace(',', ''));
  const diff = parseExpense(thisMonth) - parseExpense(prevMonth);
  const percentage = ((parseExpense(thisMonth) - parseExpense(prevMonth)) / parseExpense(prevMonth)) * 100;


  return (
    <div className="space-y-6">
      <div className="bg-finance-light-bg/50 p-4 rounded-lg">
      <h3 className="font-medium mb-2">
        This month, you spent <span className="text-2xl font-bold text-finance-accent text-red-500">${diff.toFixed(2)}</span> more than last month.
    </h3>        
        <p className="text-sm mt-1">
          This is a <span className="font-bold">{percentage.toFixed(2)}</span>% increase from the previous month.
        </p>
      </div>
    </div>
  );
};

export default Anomalies;
