
import React from 'react';
import { Outlet } from 'react-router-dom';
import { SidebarProvider } from "@/components/ui/sidebar";
import DashboardHeader from './DashboardHeader';
import DashboardSidebar from './DashboardSidebar';
import { useRealData } from '@/hooks/useRealData';

const DashboardLayout: React.FC = () => {
  // Use our mock data hook to fetch financial data
  const { financialData } = useRealData();
  
  return (
    <SidebarProvider>
      <div className="min-h-screen flex flex-col">
        <DashboardHeader 
          balance={financialData.balance} 
        />
        <div className="flex flex-1 w-full">
          <div className="w-[180px] flex-shrink-0">
            <DashboardSidebar />
          </div>
          <main className="flex-1 bg-finance-light-bg overflow-auto w-full">
            <div className="p-6 md:p-8 lg:p-12 w-full max-w-full mx-auto">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
