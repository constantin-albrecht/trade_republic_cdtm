import React from 'react';
import { Treemap } from 'recharts';
import { ChartContainer, ChartTooltipContent, ChartTooltip } from "@/components/ui/chart";
import { Separator } from "@/components/ui/separator";

// Dummy data for the treemap charts
const traderInvestmentData = [
  // Coin Capital investments
  {
    id: 'coinCapital',
    investments: [
      { name: 'Technology', size: 45, fill: '#8884d8' },
      { name: 'Healthcare', size: 25, fill: '#83a6ed' },
      { name: 'Finance', size: 15, fill: '#8dd1e1' },
      { name: 'Consumer', size: 10, fill: '#82ca9d' },
      { name: 'Energy', size: 5, fill: '#a4de6c' }
    ],
    returnPercentage: '32.4%'
  },
  // Town of Trades investments
  {
    id: 'townOfTrades',
    investments: [
      { name: 'Real Estate', size: 35, fill: '#8884d8' },
      { name: 'Technology', size: 25, fill: '#83a6ed' },
      { name: 'Consumer', size: 20, fill: '#8dd1e1' },
      { name: 'Finance', size: 15, fill: '#82ca9d' },
      { name: 'Materials', size: 5, fill: '#a4de6c' }
    ],
    returnPercentage: '28.9%'
  },
  // Village of Value investments
  {
    id: 'villageOfValue',
    investments: [
      { name: 'Healthcare', size: 40, fill: '#8884d8' },
      { name: 'Finance', size: 30, fill: '#83a6ed' },
      { name: 'Energy', size: 15, fill: '#8dd1e1' },
      { name: 'Technology', size: 10, fill: '#82ca9d' },
      { name: 'Utilities', size: 5, fill: '#a4de6c' }
    ],
    returnPercentage: '24.7%'
  }
];

const TraderInvestmentChart: React.FC<{ data: any[] }> = ({ data }) => {
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 border rounded shadow-sm">
          <p className="font-semibold">{payload[0].payload.name}</p>
          <p className="text-finance-primary">{payload[0].value}% of portfolio</p>
        </div>
      );
    }
    return null;
  };

  return (
    <ChartContainer 
      className="h-40 w-full max-w-2xl mx-auto"   // height of the tradle style
      config={{
        tech: { theme: { light: "#8884d8", dark: "#8884d8" } },
        health: { theme: { light: "#83a6ed", dark: "#83a6ed" } },
        finance: { theme: { light: "#8dd1e1", dark: "#8dd1e1" } },
        consumer: { theme: { light: "#82ca9d", dark: "#82ca9d" } },
        energy: { theme: { light: "#a4de6c", dark: "#a4de6c" } },
      }}
    >
      <Treemap
        width={600}
        height={160}
        data={data}
        dataKey="size"
        nameKey="name"
        aspectRatio={4/3}
      >
        <ChartTooltip
          content={<CustomTooltip />}
        />
      </Treemap>
    </ChartContainer>
  );
};

// Trader Row component
const TraderRow: React.FC<{
  name: string;
  imageUrl: string;
  returnPercentage: string;
  investments: any[];
}> = ({ name, imageUrl, returnPercentage, investments }) => {
  return (
    <div className="flex items-center gap-6 p-4 mb-4 w-full">
      <div className="flex-shrink-0">
        <img src={imageUrl} alt={name} className="w-16 h-16 object-cover" />
      </div>
      
      <div className="flex-shrink-0">
        <h3 className="text-lg font-semibold">{name}</h3>
        <div className="text-base font-bold text-green-600">{returnPercentage} Return</div>
      </div>
      
      <div className="flex-1">
        <TraderInvestmentChart data={investments} />
      </div>
    </div>
  );
};

const TradersRealm: React.FC = () => {
  return (
    <div className="h-full flex flex-col">
      <div className="w-full">
        <h1 className="text-3xl font-bold tracking-tight mb-2 text-center">The Trader's Realm: The Journey to Trade Republic <span style={{ display: "inline-block", width: "450px" }}></span></h1>  
        <Separator className="my-4" />
        <p/>
      </div>
      
      <div className="space-y-6">
        <TraderRow 
          name="1. Coin Capital"
          imageUrl="/city.png"
          returnPercentage={traderInvestmentData[0].returnPercentage}
          investments={traderInvestmentData[0].investments}
        />
        <Separator className="my-4" />
        
        <TraderRow 
          name="2. Town of Trades"
          imageUrl="/town.png"
          returnPercentage={traderInvestmentData[1].returnPercentage}
          investments={traderInvestmentData[1].investments}
        />
        <Separator className="my-4" />
        
        <TraderRow 
          name="3. Village of Value"
          imageUrl="/village.png"
          returnPercentage={traderInvestmentData[2].returnPercentage}
          investments={traderInvestmentData[2].investments}
        />
      </div>
    </div>
  );
};

export default TradersRealm;

