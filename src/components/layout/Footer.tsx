import { Rocket } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t">
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <Rocket className="h-6 w-6 text-primary" />
          <p className="text-center text-sm text-muted-foreground md:text-left">
             © {new Date().getFullYear()} Startup Ally. All rights reserved.
          </p>
        </div>
        <nav className="flex gap-4 sm:gap-6 text-sm text-muted-foreground">
          <Link href="/pricing" className="transition-colors hover:text-foreground">Pricing</Link>
          <Link href="#" className="transition-colors hover:text-foreground">About</Link>
          <Link href="#" className="transition-colors hover:text-foreground">Contact</Link>
        </nav>
      </div>
    </footer>
  );
}
