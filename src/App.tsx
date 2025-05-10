import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FinancialDataProvider } from "@/hooks/useRealData";

import DashboardLayout from "./components/DashboardLayout";
import Overview from "./pages/Overview";
import Insights from "./pages/Insights";
import Investment from "./pages/Investment";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <FinancialDataProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<DashboardLayout />}>
              <Route index element={<Overview />} />
              <Route path="insights" element={<Insights />} />
              <Route path="investment" element={<Investment />} />
            </Route>
            {}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </FinancialDataProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
