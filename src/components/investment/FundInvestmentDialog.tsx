
import React, { useState, useEffect } from 'react';
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
import { TrendingUp, Calendar, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import { useMockData } from '@/hooks/useMockData';

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
  const { getAvailableBalance } = useMockData();
  const [availableBalance, setAvailableBalance] = useState(0);
  const [insufficientFunds, setInsufficientFunds] = useState(false);
  
  useEffect(() => {
    if (isOpen) {
      setAvailableBalance(getAvailableBalance());
    }
  }, [isOpen, getAvailableBalance]);
  
  useEffect(() => {
    const investAmount = parseInt(amount) || 0;
    setInsufficientFunds(investAmount > availableBalance);
  }, [amount, availableBalance]);
  
  const handleInvest = () => {
    const investAmount = parseInt(amount);
    if (investAmount >= minAmount && investAmount <= availableBalance) {
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
            <div className="flex justify-between">
              <Label htmlFor="investment-amount">Investment Amount (Minimum: {minimumInvestment})</Label>
              <span className="text-sm text-muted-foreground">
                Available: ${availableBalance.toLocaleString()}
              </span>
            </div>
            <Input 
              id="investment-amount" 
              type="number" 
              placeholder="Enter amount" 
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              min={minAmount}
              className={insufficientFunds ? "border-red-500" : ""}
            />
            {insufficientFunds && (
              <div className="text-red-500 text-sm flex items-center gap-1 mt-1">
                <AlertCircle className="h-3 w-3" /> Insufficient funds
              </div>
            )}
          </div>
        </div>
        
        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={onClose} className="mr-2">Cancel</Button>
          <Button 
            onClick={handleInvest}
            disabled={!amount || parseInt(amount) < minAmount || insufficientFunds}
          >
            Invest Now
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FundInvestmentDialog;
