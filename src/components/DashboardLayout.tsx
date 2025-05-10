
import React from 'react';
import { Outlet } from 'react-router-dom';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import DashboardHeader from './DashboardHeader';
import DashboardSidebar from './DashboardSidebar';

const DashboardLayout: React.FC = () => {
  // Mock data - in a real app, this would come from an API or state
  const financialData = {
    balance: "$12,456.78",
    netWorth: "$243,872.54"
  };
  
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full flex-col">
        <DashboardHeader balance={financialData.balance} netWorth={financialData.netWorth} />
        <div className="flex flex-1 w-full overflow-hidden">
          <DashboardSidebar />
          <main className="flex-1 overflow-auto bg-finance-light-bg">
            <div className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <SidebarTrigger />
              </div>
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
