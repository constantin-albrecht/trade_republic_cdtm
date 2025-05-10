
import React from 'react';
import InvestmentItem from '@/components/investment/InvestmentItem';

const currentInvestments = [
  {
    id: "inv1",
    name: "European Growth Fund II",
    assetClass: "Private Equity",
    fundSize: "$450M",
    ticketSize: "$50,000",
    date: "Jan 15, 2025",
    returns: {
      value: 12.5,
      isPositive: true
    }
  },
  {
    id: "inv2",
    name: "Renewable Energy Infrastructure",
    assetClass: "Infrastructure",
    fundSize: "$1.2B",
    ticketSize: "$75,000",
    date: "Nov 30, 2024",
    returns: {
      value: 7.8,
      isPositive: true
    }
  },
  {
    id: "inv3",
    name: "Tech Ventures Fund",
    assetClass: "Venture Capital",
    fundSize: "$250M",
    ticketSize: "$25,000",
    date: "Mar 22, 2025",
    returns: {
      value: 2.3,
      isPositive: false
    }
  }
];

const InvestmentPortfolio: React.FC = () => {
  return (
    <div className="mt-auto">
      <h2 className="text-lg font-semibold mb-1">Latest Investments</h2>
      <p className="text-muted-foreground mb-2 text-sm">Your current investment portfolio</p>
      
      <div className="space-y-1">
        {currentInvestments.map((investment) => (
          <InvestmentItem 
            key={investment.id}
            name={investment.name}
            assetClass={investment.assetClass}
            fundSize={investment.fundSize}
            ticketSize={investment.ticketSize}
            date={investment.date}
            returns={investment.returns}
          />
        ))}
      </div>
    </div>
  );
};

export default InvestmentPortfolio;
