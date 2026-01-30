'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, BrainCircuit, Presentation, AreaChart, Package } from 'lucide-react';
import * as auth from '@/lib/auth';

const tools = [
  {
    icon: <BrainCircuit className="h-8 w-8 text-primary" />,
    title: 'Strategy Planner',
    description: 'Craft your business strategy.',
    href: '/dashboard/strategy-planner',
  },
  {
    icon: <Presentation className="h-8 w-8 text-primary" />,
    title: 'Pitch Deck Generator',
    description: 'Create a winning pitch deck.',
    href: '/dashboard/pitch-deck',
  },
  {
    icon: <AreaChart className="h-8 w-8 text-primary" />,
    title: 'Financial Summary',
    description: 'Analyze your financial data.',
    href: '/dashboard/financial-summary',
  },
  {
    icon: <Package className="h-8 w-8 text-primary" />,
    title: 'Investor Kit',
    description: 'Compile your investor materials.',
    href: '/dashboard/investor-materials',
  },
];

export default function DashboardPage() {
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const user = auth.getUser();
    if (user) {
      setUserName(user.name.split(' ')[0]);
    }
  }, []);

  return (
    <div className="animate-in fade-in-50 duration-500">
      <div className="mb-8">
        <h1 className="text-3xl font-bold font-headline">Welcome back, {userName}</h1>
        <p className="text-muted-foreground">Here are your tools to build and grow.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {tools.map((tool) => (
          <Card key={tool.title} className="flex flex-col hover:shadow-md transition-shadow">
            <CardHeader>
              {tool.icon}
              <CardTitle className="mt-4 font-headline">{tool.title}</CardTitle>
              <CardDescription>{tool.description}</CardDescription>
            </CardHeader>
            <CardContent className="mt-auto">
              <Button asChild variant="outline">
                <Link href={tool.href}>
                  Open Tool <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
