
import React from 'react';
import InvestmentSelection from './InvestmentSelection';
import InvestmentRecommendations from './InvestmentRecommendations';
import { useState } from 'react';

const Investment: React.FC = () => {
  const [selectedAsset, setSelectedAsset] = useState<string | null>(null);
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  
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
  
  return (
    <div className="h-full flex flex-col">
      <h1 className="text-2xl font-bold tracking-tight mb-2">Investment Opportunities</h1>
      
      {!showRecommendations ? (
        <InvestmentSelection 
          selectedAsset={selectedAsset}
          selectedFilters={selectedFilters}
          onAssetSelect={handleAssetSelect}
          onFilterToggle={toggleFilter}
          onNext={handleNext}
        />
      ) : (
        <InvestmentRecommendations 
          onBack={handleBack}
        />
      )}
    </div>
  );
};

export default Investment;
