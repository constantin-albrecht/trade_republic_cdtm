
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
      <div className="h-screen flex flex-col overflow-hidden">
        <DashboardHeader 
          balance={financialData.balance} 
          netWorth={financialData.netWorth} 
        />
        <div className="flex flex-1 overflow-hidden">
          <DashboardSidebar />
          <main className="flex-1 overflow-hidden bg-finance-light-bg">
            <div className="h-full p-6">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
