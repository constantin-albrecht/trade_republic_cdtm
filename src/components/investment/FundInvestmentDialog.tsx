
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TrendingUp, Calendar, CheckCircle2, Clock } from 'lucide-react';

interface Feature {
  text: string;
  icon: React.ReactNode;
}

interface FundInvestmentDialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  features: Feature[];
  returns: string;
  risk: 'Low' | 'Medium' | 'High';
  minimumInvestment: string;
  onInvest: (amount: number) => void;
}

const FundInvestmentDialog: React.FC<FundInvestmentDialogProps> = ({
  isOpen,
  onClose,
  title,
  description,
  features,
  returns,
  risk,
  minimumInvestment,
  onInvest
}) => {
  const [amount, setAmount] = useState('');
  const minAmount = parseInt(minimumInvestment.replace(/[^0-9]/g, ''));
  
  const handleInvest = () => {
    const investAmount = parseInt(amount);
    if (investAmount >= minAmount) {
      onInvest(investAmount);
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[625px] backdrop-blur-sm bg-white/80">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Expected Returns</Label>
              <div className="font-medium text-finance-accent">{returns}</div>
            </div>
            <div>
              <Label>Risk Level</Label>
              <div 
                className={
                  risk === 'Low' ? "text-finance-accent" : 
                  risk === 'Medium' ? "text-finance-warning" : 
                  "text-finance-danger"
                }
              >
                {risk}
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label>Key Features</Label>
            <ul className="space-y-2 bg-white/60 p-3 rounded-lg">
              {features.map((feature, index) => (
                <li key={index} className="flex items-start gap-2">
                  <div className="text-primary mt-0.5">{feature.icon}</div>
                  <span>{feature.text}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="investment-amount">Investment Amount (Minimum: {minimumInvestment})</Label>
            <Input 
              id="investment-amount" 
              type="number" 
              placeholder="Enter amount" 
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              min={minAmount}
            />
          </div>
        </div>
        
        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={onClose} className="mr-2">Cancel</Button>
          <Button 
            onClick={handleInvest}
            disabled={!amount || parseInt(amount) < minAmount}
          >
            Invest Now
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FundInvestmentDialog;
