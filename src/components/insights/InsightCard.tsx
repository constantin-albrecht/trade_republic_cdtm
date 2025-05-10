
import React from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface InsightCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  buttonText?: string;
  color?: string;
  className?: string;
}

const InsightCard: React.FC<InsightCardProps> = ({ 
  title, 
  description, 
  icon, 
  buttonText = "Learn more", 
  color = "#3B82F6",
  className 
}) => {
  return (
    <Card className={cn(className)}>
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-medium">{title}</CardTitle>
        <div className="h-8 w-8 rounded-full" style={{ backgroundColor: color, opacity: 0.2 }}>
          <div className="flex h-full w-full items-center justify-center">
            {React.cloneElement(icon as React.ReactElement, { 
              className: "h-5 w-5",
              style: { color } 
            })}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
      <CardFooter>
        <Button variant="link" size="sm" className="p-0 h-auto" style={{ color }}>
          {buttonText} <ArrowRight className="ml-1 h-3 w-3" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default InsightCard;
