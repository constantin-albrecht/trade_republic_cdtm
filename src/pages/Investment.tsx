
import React, { useState } from 'react';
import AssetClassCard from '@/components/investment/AssetClassCard';
import FilterBubble from '@/components/investment/FilterBubble';
import FundCard from '@/components/investment/FundCard';
import InvestmentItem from '@/components/investment/InvestmentItem';
import { Button } from '@/components/ui/button';
import { Wallet, Lightbulb, Building2 } from 'lucide-react';
import { CheckCircle2, TrendingUp, Clock, Calendar } from 'lucide-react';
import { toast } from 'sonner';
import { useRealData } from '@/hooks/useRealData';

const assetClasses = [
  {
    id: "vc",
    title: "Venture Capital",
    description: "High risk, high reward investments in early stage startups with potential for significant growth.",
    icon: <Lightbulb />
  },
  {
    id: "infra",
    title: "Infrastructure",
    description: "Moderate risk investments in physical assets like energy, transportation and communication networks.",
    icon: <Building2 />
  },
  {
    id: "pe",
    title: "Private Equity",
    description: "Investment in private companies or buyouts of public companies with the goal of selling for profit.",
    icon: <Wallet />
  }
];

const filterOptions = [
  "Environment", "Medium Size", "Short-Term", "Technology", 
  "Healthcare", "High Growth", "Sustainable", "Emerging Markets",
  "Dividend", "Low Risk"
];

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

const Investment: React.FC = () => {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [selectedAsset, setSelectedAsset] = useState<string | null>(null);
  const [showRecommendations, setShowRecommendations] = useState(false);
  

  const { updateBalance, getAvailableBalance } = useRealData();
  
  const toggleFilter = (filter: string) => {
    if (selectedFilters.includes(filter)) {
      setSelectedFilters(selectedFilters.filter(f => f !== filter));
    } else {
      setSelectedFilters([...selectedFilters, filter]);
    }
  };
  
  const handleAssetSelect = (assetId: string) => {
    setSelectedAsset(assetId);
  };
  
  const handleNext = () => {
    setShowRecommendations(true);
  };
  
  const handleBack = () => {
    setShowRecommendations(false);
  };
  
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
    <div className="h-full flex flex-col">
      <div className="w-full">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Investment Suggestions</h1>
          <p className="text-muted-foreground">
          Your way to invest in Private Markets. Personalized. For everyone.
          </p>
          <br></br>
      </div>
      
      {!showRecommendations ? (
        <div className="flex flex-col h-full">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {assetClasses.map((assetClass) => (
              <AssetClassCard 
                key={assetClass.id}
                title={assetClass.title}
                description={assetClass.description}
                icon={assetClass.icon}
                isSelected={selectedAsset === assetClass.id}
                onClick={() => handleAssetSelect(assetClass.id)}
              />
            ))}
          </div>
          
          <div className="mt-2">
            <br></br>
            <h2 className="text-lg font-semibold mb-1">Investment Preferences</h2>
            <p className="text-muted-foreground mb-2 text-sm">Select criteria that matter to you</p>
            <p/>
            
            <div className="flex flex-wrap gap-2">
              {filterOptions.map((filter) => (
                <FilterBubble 
                  key={filter}
                  label={filter}
                  isSelected={selectedFilters.includes(filter)}
                  onClick={() => toggleFilter(filter)}
                />
              ))}
            </div>
          </div>
          
          <div className="flex justify-end mt-auto">
            <Button 
              onClick={handleNext}
              disabled={!selectedAsset}
              size="sm"
            >
              Next
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col h-full overflow-hidden">
          
          <div className="mb-2">
            <h2 className="text-lg font-semibold mb-1">Based on your preferences</h2>
            <p className="text-muted-foreground mb-2 text-sm">Based on your preferences</p>
            
            <Button 
            variant="outline" 
            onClick={handleBack}
            className="mb-2 self-start"
            size="sm"
          >
            Back to Selection
          </Button>

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
        </div>
      )}
    </div>
  );
};

export default Investment;
