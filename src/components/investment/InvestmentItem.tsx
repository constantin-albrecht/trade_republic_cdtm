
import React from 'react';
import { 
  Card, 
  CardContent
} from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Minus } from 'lucide-react';

interface InvestmentItemProps {
  name: string;
  assetClass: string;
  fundSize: string;
  ticketSize: string;
  date: string;
  returns?: {
    value: number;
    isPositive: boolean;
  };
}

const InvestmentItem: React.FC<InvestmentItemProps> = ({ 
  name, 
  assetClass, 
  fundSize, 
  ticketSize, 
  date,
  returns 
}) => {
  return (
    <Card className="mb-4">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h3 className="font-medium">{name}</h3>
              <Badge variant="outline">{assetClass}</Badge>
            </div>
            <div className="text-sm text-muted-foreground">
              <span>Fund Size: {fundSize}</span>
              <span className="mx-2">•</span>
              <span>Your Investment: {ticketSize}</span>
              <span className="mx-2">•</span>
              <span>Invested on {date}</span>
            </div>
            
            {returns && (
              <div className={returns.isPositive ? "text-finance-accent" : "text-finance-danger"}>
                <span className="text-sm font-medium">
                  {returns.isPositive ? "+" : ""}{returns.value}% return
                </span>
              </div>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Minus className="h-4 w-4 mr-1" />
              Sell
            </Button>
            <Button variant="outline" size="sm">
              <Plus className="h-4 w-4 mr-1" />
              Buy
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default InvestmentItem;
