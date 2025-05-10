
import React from 'react';
import { Button } from '@/components/ui/button';
import FundCard from '@/components/investment/FundCard';
import { toast } from 'sonner';
import { useMockData } from '@/hooks/useMockData';
import { CheckCircle2, TrendingUp, Clock, Calendar } from 'lucide-react';
import InvestmentPortfolio from './InvestmentPortfolio';

interface InvestmentRecommendationsProps {
  onBack: () => void;
}

const recommendedFunds = [
  {
    id: "fund1",
    title: "Global Tech Growth Fund",
    description: "A venture capital fund focused on emerging technology companies with high growth potential.",
    returns: "15-20% p.a.",
    risk: "High" as const,
    minimumInvestment: "$100",
    features: [
      { text: "Portfolio of 25+ tech startups", icon: <CheckCircle2 className="h-4 w-4" /> },
      { text: "5-year investment horizon", icon: <Calendar className="h-4 w-4" /> },
      { text: "Quarterly performance reports", icon: <TrendingUp className="h-4 w-4" /> },
      { text: "Access to exclusive investor events", icon: <CheckCircle2 className="h-4 w-4" /> }
    ]
  },
  {
    id: "fund2",
    title: "Sustainable Infrastructure Fund",
    description: "Invests in renewable energy infrastructure projects across North America and Europe.",
    returns: "8-12% p.a.",
    risk: "Medium" as const,
    minimumInvestment: "$250",
    features: [
      { text: "Focus on solar and wind projects", icon: <CheckCircle2 className="h-4 w-4" /> },
      { text: "7-10 year investment period", icon: <Calendar className="h-4 w-4" /> },
      { text: "Stable cash flow from operations", icon: <TrendingUp className="h-4 w-4" /> },
      { text: "Environmentally certified projects", icon: <CheckCircle2 className="h-4 w-4" /> }
    ]
  },
  {
    id: "fund3",
    title: "Healthcare Innovation Fund",
    description: "Private equity fund specializing in mid-stage healthcare and biotech companies.",
    returns: "12-18% p.a.",
    risk: "Medium" as const,
    minimumInvestment: "$500",
    features: [
      { text: "Focus on medical devices & therapeutics", icon: <CheckCircle2 className="h-4 w-4" /> },
      { text: "3-8 year exit strategy", icon: <Clock className="h-4 w-4" /> },
      { text: "Quarterly investor updates", icon: <TrendingUp className="h-4 w-4" /> },
      { text: "Advisory board of medical professionals", icon: <CheckCircle2 className="h-4 w-4" /> }
    ]
  }
];

const InvestmentRecommendations: React.FC<InvestmentRecommendationsProps> = ({ onBack }) => {
  // Use our mock data hook
  const { updateBalance, getAvailableBalance } = useMockData();
  
  const handleInvest = (amount: number) => {
    const availableBalance = getAvailableBalance();
    
    if (amount > availableBalance) {
      toast.error(`Insufficient funds. Available balance: ${availableBalance.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}`);
      return;
    }
    
    // Update balance
    updateBalance(amount);
    
    // Show success toast
    toast.success(`Successfully invested $${amount.toLocaleString()} in the fund`);
    
    // In a real app, this would make an API call to record the investment
    console.log(`Invested $${amount} in fund`);
  };
  
  return (
    <div className="flex flex-col h-full overflow-hidden">
      <Button 
        variant="outline" 
        onClick={onBack}
        className="mb-2 self-start"
        size="sm"
      >
        Back to Selection
      </Button>
      
      <div className="mb-2">
        <h2 className="text-lg font-semibold mb-1">Investment Recommendations</h2>
        <p className="text-muted-foreground mb-2 text-sm">Based on your preferences</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {recommendedFunds.map((fund) => (
            <FundCard 
              key={fund.id}
              title={fund.title}
              description={fund.description}
              features={fund.features}
              returns={fund.returns}
              risk={fund.risk}
              minimumInvestment={fund.minimumInvestment}
              onInvest={handleInvest}
            />
          ))}
        </div>
      </div>
      
      <InvestmentPortfolio />
    </div>
  );
};

export default InvestmentRecommendations;
