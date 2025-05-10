
import React from 'react';
import { cn } from '@/lib/utils';

interface FilterBubbleProps {
  label: string;
  isSelected?: boolean;
  onClick?: () => void;
}

const FilterBubble: React.FC<FilterBubbleProps> = ({ 
  label, 
  isSelected = false,
  onClick 
}) => {
  return (
    <button
      className={cn(
        "rounded-full px-4 py-2 text-sm transition-all",
        isSelected 
          ? "bg-primary text-primary-foreground shadow-md" 
          : "bg-secondary hover:bg-secondary/80"
      )}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default FilterBubble;
