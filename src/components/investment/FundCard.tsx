 
import React, { useState } from 'react';
import { 
  Card, 
  CardContent,
  CardHeader, 
  CardTitle,
  CardDescription,
  CardFooter
} from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import FundInvestmentDialog from './FundInvestmentDialog';

interface FundFeature {
  text: string;
  icon: React.ReactNode;
}

interface FundCardProps {
  title: string;
  description: string;
  features: FundFeature[];
  returns?: string;
  risk?: 'Low' | 'Medium' | 'High';
  minimumInvestment?: string;
  onInvest?: (amount: number) => void;
}

const FundCard: React.FC<FundCardProps> = ({ 
  title, 
  description, 
  features,
  returns,
  risk,
  minimumInvestment,
  onInvest = () => {}
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
      <Card className="h-full">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {returns && (
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Expected Returns:</span>
              <span className="text-finance-accent font-medium">{returns}</span>
            </div>
          )}
          
          {risk && (
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Risk Level:</span>
              <span 
                className={
                  risk === 'Low' ? "text-finance-accent" : 
                  risk === 'Medium' ? "text-finance-warning" : 
                  "text-finance-danger"
                }
              >
                {risk}
              </span>
            </div>
          )}
          
          {minimumInvestment && (
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Minimum Investment:</span>
              <span>{minimumInvestment}</span>
            </div>
          )}
          
          <div className="pt-2">
            <h4 className="text-sm font-medium mb-2">Key Features</h4>
            <ul className="space-y-2">
              {features.map((feature, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <div className="h-5 w-5 text-primary mt-0.5">
                    {feature.icon}
                  </div>
                  <span className="text-sm">{feature.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full" onClick={() => setIsDialogOpen(true)}>Invest Now</Button>
        </CardFooter>
      </Card>

      <FundInvestmentDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        title={title}
        description={description}
        features={features}
        returns={returns || ''}
        risk={risk || 'Medium'}
        minimumInvestment={minimumInvestment || '$100'}
        onInvest={onInvest}
      />
    </>
  );
};

export default FundCard;
