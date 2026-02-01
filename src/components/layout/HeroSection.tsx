'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function HeroSection() {
  return (
    <section className="relative w-full min-h-[60vh] flex items-center justify-center overflow-hidden py-24 md:py-32 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/20 via-background to-background">
      <div className="container mx-auto flex flex-col items-center text-center space-y-8">
        <h1 className="text-4xl md:text-6xl font-bold font-headline max-w-4xl">
          Your 24/7 AI Chief of Staff
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl">
          Empower Your Startup Journey with Intelligent Strategy and Automation.
        </p>
        <div className="pt-4">
          <Button size="lg" asChild className="bg-primary hover:shadow-lg hover:shadow-accent/50 transition-shadow">
            <Link href="/signup">
              Start Free Trial
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
