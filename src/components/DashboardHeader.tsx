
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell } from 'lucide-react';

interface DashboardHeaderProps {
  balance: string;
}
 
const DashboardHeader: React.FC<DashboardHeaderProps> = ({ balance }) => {
  return (
    <header className="bg-white border-b z-50 shadow-sm sticky top-0 w-full left-0 right-0">
      <div className="flex items-center justify-between p-4 max-w-full">
        <div className="flex items-center">
          <img src="logoX.png" alt="Trade Republic Logo" className="mr-2" style={{ width: '160px' }} />
        </div>
        
        <div className="hidden sm:flex items-center gap-8 text-center">
          <div>
            <p className="text-sm text-muted-foreground">Available Balance</p>
            <p className="font-medium text-lg">{balance}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <button className="p-2 rounded-full hover:bg-gray-100">
            <Bell className="h-5 w-5 text-gray-600" />
          </button>
          <Avatar>
            <AvatarImage src="https://media.licdn.com/dms/image/v2/D4D03AQHgoaOVvG6LVg/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1725447724887?e=2147483647&v=beta&t=oOzSWc9YiwIJdWa7R8VfcF-UDY6-bOXSHyBOtVDXnYc" alt="User" />
            <AvatarFallback>UR</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
