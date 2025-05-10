
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell } from 'lucide-react';

interface DashboardHeaderProps {
  balance: string;
  netWorth: string;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ balance, netWorth }) => {
  return (
    <header className="bg-white border-b z-50 shadow-sm sticky top-0 w-full">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center">
          <img src="logo.png" alt="Trade Republic Logo" className="mr-2" style={{ width: '220px' }} />
          
        </div>
        
        <div className="hidden sm:flex items-center gap-8 text-center">
          <div>
            <p className="text-sm text-muted-foreground">Available Balance</p>
            <p className="font-medium text-lg">{balance}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Net Worth</p>
            <p className="font-medium text-lg">{netWorth}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <button className="p-2 rounded-full hover:bg-gray-100">
            <Bell className="h-5 w-5 text-gray-600" />
          </button>
          <Avatar>
            <AvatarImage src="/placeholder.svg" alt="User" />
            <AvatarFallback>UR</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
