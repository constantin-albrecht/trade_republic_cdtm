
import React from 'react';
import { Outlet } from 'react-router-dom';
import { SidebarProvider } from "@/components/ui/sidebar";
import DashboardHeader from './DashboardHeader';
import DashboardSidebar from './DashboardSidebar';
import { useFinancialData } from '@/hooks/useFinancialData';

const DashboardLayout: React.FC = () => {
  // Use our new financial data hook
  const { financialData } = useFinancialData();
  
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
            <div className="p-12">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
