
import React from 'react';
import AssetClassCard from '@/components/investment/AssetClassCard';
import FilterBubble from '@/components/investment/FilterBubble';
import { Button } from '@/components/ui/button';
import { Wallet, Lightbulb, Building2 } from 'lucide-react';

interface InvestmentSelectionProps {
  selectedAsset: string | null;
  selectedFilters: string[];
  onAssetSelect: (assetId: string) => void;
  onFilterToggle: (filter: string) => void;
  onNext: () => void;
}

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

const InvestmentSelection: React.FC<InvestmentSelectionProps> = ({
  selectedAsset,
  selectedFilters,
  onAssetSelect,
  onFilterToggle,
  onNext
}) => {
  return (
    <div className="flex flex-col h-full">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {assetClasses.map((assetClass) => (
          <AssetClassCard 
            key={assetClass.id}
            title={assetClass.title}
            description={assetClass.description}
            icon={assetClass.icon}
            isSelected={selectedAsset === assetClass.id}
            onClick={() => onAssetSelect(assetClass.id)}
          />
        ))}
      </div>
      
      <div className="mt-2">
        <h2 className="text-lg font-semibold mb-1">Investment Preferences</h2>
        <p className="text-muted-foreground mb-2 text-sm">Select criteria that matter to you</p>
        
        <div className="flex flex-wrap gap-2">
          {filterOptions.map((filter) => (
            <FilterBubble 
              key={filter}
              label={filter}
              isSelected={selectedFilters.includes(filter)}
              onClick={() => onFilterToggle(filter)}
            />
          ))}
        </div>
      </div>
      
      <div className="flex justify-end mt-auto">
        <Button 
          onClick={onNext}
          disabled={!selectedAsset}
          size="sm"
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default InvestmentSelection;
