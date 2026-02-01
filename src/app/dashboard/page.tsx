'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, BrainCircuit, Presentation, AreaChart, Package, Star, Wand2 } from 'lucide-react';
import * as auth from '@/lib/auth';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const recentItems = [
  {
    icon: <Presentation className="h-6 w-6 text-primary" />,
    title: 'Generated Pitch Deck - Jan 2026',
    date: 'Jan 20, 2026',
    href: '/dashboard/pitch-deck'
  },
  {
    icon: <BrainCircuit className="h-6 w-6 text-primary" />,
    title: 'SWOT Analysis - Q1',
    date: 'Jan 18, 2026',
    href: '/dashboard/strategy-planner'
  },
  {
    icon: <AreaChart className="h-6 w-6 text-primary" />,
    title: 'Financial Projections v2',
    date: 'Jan 15, 2026',
    href: '/dashboard/financial-summary'
  },
];

export default function DashboardPage() {
  const [userName, setUserName] = useState('');
  const [isPremium, setIsPremium] = useState(false);

  useEffect(() => {
    const user = auth.getUser();
    if (user) {
      setUserName(user.name.split(' ')[0]);
      // This is a mock check for premium status.
      // In a real app, this would come from your user data.
    }
  }, []);

  return (
    <div className="animate-in fade-in-50 duration-500 space-y-8">
      <div className="relative overflow-hidden rounded-xl bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/20 via-background to-secondary border p-8">
        <div className="relative z-10">
          <h1 className="text-3xl font-bold font-headline mb-2">Welcome back, {userName}</h1>
          <p className="text-muted-foreground max-w-xl">Ready to build something amazing today? Your AI Chief of Staff is standing by.</p>
        </div>
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/10 blur-3xl pointer-events-none"></div>
      </div>

      {!isPremium && (
        <Alert className="bg-accent/10 border-accent/50 text-accent-foreground">
          <Star className="h-5 w-5 text-accent" />
          <AlertTitle className="font-headline text-accent">Upgrade to Pro</AlertTitle>
          <AlertDescription>
            <div className="flex flex-wrap justify-between items-center gap-2">
              <span>Unlock unlimited exports, advanced models, and premium templates.</span>
              <Button asChild size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90">
                <Link href="/pricing">
                  Upgrade Now <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </AlertDescription>
        </Alert>
      )}

      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="font-headline text-xl flex items-center gap-2">
            <Wand2 className="h-6 w-6 text-primary" />
            Quick-Start
          </CardTitle>
          <CardDescription>
            What strategic task can I help you with? Try &quot;Draft a go-to-market plan for a new SaaS product.&quot;
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="relative">
              <Input placeholder="Tell me what you want to create..." className="pr-28 h-12 text-base" />
              <Button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2">Generate</Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <div>
        <h2 className="text-2xl font-bold font-headline mb-4">Recent Work</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentItems.map((item) => (
            <Link href={item.href} key={item.title} className="block">
              <Card className="hover:shadow-lg transition-shadow h-full">
                <CardHeader className="flex-row items-center gap-4 space-y-0 p-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    {item.icon}
                  </div>
                  <div className="pt-1">
                    <p className="font-semibold">{item.title}</p>
                    <p className="text-sm text-muted-foreground">{item.date}</p>
                  </div>
                </CardHeader>
              </Card>
            </Link>
          ))}
          <div className="border-2 border-dashed bg-secondary hover:border-primary/50 transition-all rounded-lg h-full flex items-center justify-center text-center">
            <div className="p-6">
              <Package className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
              <p className="text-muted-foreground font-medium">Start a new project</p>
              <p className="text-xs text-muted-foreground">using your tools.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
