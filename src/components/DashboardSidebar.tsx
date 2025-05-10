
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
  SidebarGroupLabel,
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
    <div className="h-full bg-sidebar">
      <SidebarContent className="h-full">
        <SidebarGroup>
          <SidebarGroupLabel>Main Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <SidebarMenuItem key={item.path}>
                    <SidebarMenuButton 
                      asChild
                      className={isActive ? "bg-sidebar-accent" : ""}
                    >
                      <Link to={item.path} className="flex items-center gap-3">
                        <item.icon className="h-5 w-5" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </div>
  );
};

export default DashboardSidebar;
