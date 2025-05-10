
import React from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription,
  CardFooter
} from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface AssetClassCardProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  color?: string;
  isSelected?: boolean;
  onClick?: () => void;
}

const AssetClassCard: React.FC<AssetClassCardProps> = ({ 
  title, 
  description, 
  icon, 
  color = "#3B82F6",
  isSelected = false,
  onClick 
}) => {
  return (
    <Card 
      className={cn(
        "cursor-pointer transition-all",
        isSelected 
          ? "border-2 border-primary shadow-md" 
          : "hover:shadow-md"
      )}
      onClick={onClick}
    >
      <CardHeader className="pb-2">
        {icon && (
          <div 
            className="h-10 w-10 rounded-full mb-2 flex items-center justify-center"
            style={{ backgroundColor: `${color}20` }} // Using hex with opacity
          >
            {React.cloneElement(icon as React.ReactElement, { 
              style: { color },
              className: "h-5 w-5" 
            })}
          </div>
        )}
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>{description}</CardDescription>
      </CardContent>
      <CardFooter>
        <Button 
          variant={isSelected ? "default" : "outline"}
          size="sm"
          className="w-full"
        >
          {isSelected ? "Selected" : "Select"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AssetClassCard;
