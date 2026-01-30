'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Sidebar,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarContent,
} from '@/components/ui/sidebar';
import {
  LayoutDashboard,
  BrainCircuit,
  Presentation,
  AreaChart,
  Package,
  User,
  LogOut,
  Rocket,
  Settings,
  Shield,
} from 'lucide-react';
import { Button } from '../ui/button';
import * as auth from '@/lib/auth';
import { useRouter } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

const navItems = [
  { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/dashboard/strategy-planner', icon: BrainCircuit, label: 'Strategy Planner' },
  { href: '/dashboard/pitch-deck', icon: Presentation, label: 'Pitch Deck' },
  { href: '/dashboard/financial-summary', icon: AreaChart, label: 'Financials' },
  { href: '/dashboard/investor-materials', icon: Package, label: 'Investor Kit' },
  { href: '/dashboard/admin', icon: Shield, label: 'Admin' },
];

const bottomNavItems = [
    { href: '/dashboard/profile', icon: User, label: 'Profile' },
];

export function DashboardSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const user = auth.getUser();

  const handleLogout = () => {
    auth.logout();
    router.push('/login');
  };

  return (
    <Sidebar>
        <SidebarHeader>
            <Link href="/" className="flex items-center gap-2">
                <Rocket className="size-6 text-primary" />
                <span className="text-lg font-semibold font-headline">Startup Ally</span>
            </Link>
        </SidebarHeader>
        <SidebarContent>
            <SidebarMenu>
            {navItems.map((item) => {
              const isActive = item.href === '/dashboard' ? pathname === item.href : pathname.startsWith(item.href);
              return (
                <SidebarMenuItem key={item.href}>
                <Link href={item.href}>
                    <SidebarMenuButton
                    isActive={isActive}
                    tooltip={item.label}
                    >
                    <item.icon />
                    <span>{item.label}</span>
                    </SidebarMenuButton>
                </Link>
                </SidebarMenuItem>
              );
            })}
            </SidebarMenu>
        </SidebarContent>
        <SidebarFooter className="gap-4">
             <SidebarMenu>
                 {bottomNavItems.map((item) => (
                     <SidebarMenuItem key={item.href}>
                        <Link href={item.href}>
                            <SidebarMenuButton
                            isActive={pathname === item.href}
                            tooltip={item.label}
                            >
                            <item.icon />
                            <span>{item.label}</span>
                            </SidebarMenuButton>
                        </Link>
                    </SidebarMenuItem>
                 ))}
             </SidebarMenu>

             <div className="flex items-center gap-3 p-2 rounded-lg bg-secondary">
                 <Avatar className='h-9 w-9'>
                    <AvatarImage src={user?.avatar} alt={user?.name} />
                    <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className='overflow-hidden'>
                    <p className='text-sm font-semibold truncate'>{user?.name}</p>
                    <p className='text-xs text-muted-foreground truncate'>{user?.email}</p>
                </div>
                <Button variant="ghost" size="icon" className="ml-auto" onClick={handleLogout}>
                    <LogOut className="w-4 h-4" />
                </Button>
            </div>
        </SidebarFooter>
    </Sidebar>
  );
}
