
import React from 'react';
import { Outlet } from 'react-router-dom';
import { SidebarProvider } from "@/components/ui/sidebar";
import DashboardHeader from './DashboardHeader';
import DashboardSidebar from './DashboardSidebar';
import { useMockData } from '@/hooks/useMockData';

const DashboardLayout: React.FC = () => {
  // Use our mock data hook to fetch financial data
  const { financialData } = useMockData();
  
  return (
    <SidebarProvider>
      <div className="min-h-screen flex flex-col">
        <DashboardHeader 
          balance={financialData.balance} 
          netWorth={financialData.netWorth} 
        />
        <div className="flex flex-1">
          <div className="w-[180px]">
            <DashboardSidebar />
          </div>
          <main className="flex-1 bg-finance-light-bg overflow-auto">
            <div className="p-4">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
