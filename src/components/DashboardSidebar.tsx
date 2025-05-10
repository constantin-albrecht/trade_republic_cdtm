
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Sidebar, 
  SidebarContent, 
  SidebarMenu, 
  SidebarMenuItem, 
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupContent,
} from "@/components/ui/sidebar";
import { Home, BarChart2, Wallet } from 'lucide-react';

const menuItems = [
  {
    title: "Overview",
    path: "/",
    icon: Home,
  },
  {
    title: "Insights",
    path: "/insights",
    icon: BarChart2,
  },
  {
    title: "Investment",
    path: "/investment",
    icon: Wallet,
  }
];

const DashboardSidebar: React.FC = () => {
  const location = useLocation();
  
  return (
    <Sidebar className="min-w-[180px] h-full" variant="sidebar" collapsible="none">
      <SidebarContent className="h-full">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <SidebarMenuItem key={item.path}>
                    <SidebarMenuButton 
                      asChild
                      className={`${isActive ? "bg-sidebar-accent max-w-[160px]" : ""} text-white hover:max-w-[160px]`}
                    >
                      <Link to={item.path} className="flex items-center gap-2 w-full">
                        <item.icon className="h-4 w-4" />
                        <span className="text-sm">{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default DashboardSidebar;
