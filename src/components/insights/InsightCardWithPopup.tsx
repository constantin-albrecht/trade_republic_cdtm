
import React, { useState } from 'react';
import { 
  Card, 
  CardContent,
  CardDescription,
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { X } from 'lucide-react';

interface InsightCardWithPopupProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  color?: string;
  buttonText?: string;
  children: React.ReactNode;
}

const InsightCardWithPopup: React.FC<InsightCardWithPopupProps> = ({ 
  title,
  description,
  icon,
  color = "#6E59A5",
  buttonText = "See Details",
  children
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Card 
        className="hover:shadow-md cursor-pointer transition-all" 
        onClick={() => setIsOpen(true)}
      >
        <CardContent className="pt-6">
          <div className="flex items-start gap-4">
            <div 
              className="p-2 rounded-full" 
              style={{ backgroundColor: `${color}20` }}
            >
              <div className="text-white p-1 rounded-full" style={{ backgroundColor: color }}>
                {icon}
              </div>
            </div>
            <div>
              <CardTitle className="text-lg mb-1">{title}</CardTitle>
              <CardDescription>{description}</CardDescription>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" size="sm" className="ml-auto">{buttonText}</Button>
        </CardFooter>
      </Card>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[625px] backdrop-blur-sm bg-white/80">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <span className="p-1 rounded-full text-white" style={{ backgroundColor: color }}>
                {icon}
              </span>
              {title}
            </DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
          
          {children}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default InsightCardWithPopup;
