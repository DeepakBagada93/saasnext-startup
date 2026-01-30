import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Check } from 'lucide-react';

const tiers = [
  {
    name: 'Founder',
    price: '$29',
    pricePeriod: '/ month',
    description: 'For solo founders and early-stage startups.',
    features: [
      'Strategy Planner',
      'Pitch Deck Generator',
      'Financial Summary Tool',
      'Community Access',
    ],
    cta: 'Choose Founder',
    popular: false,
  },
  {
    name: 'Growth',
    price: '$79',
    pricePeriod: '/ month',
    description: 'For growing teams that need more power and collaboration.',
    features: [
      'All Founder features',
      'Advanced AI Models',
      'Team Collaboration (up to 5 users)',
      'Priority Support',
    ],
    cta: 'Choose Growth',
    popular: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    pricePeriod: '',
    description: 'For established companies and venture studios.',
    features: [
      'All Growth features',
      'Unlimited Users',
      'Dedicated Account Manager',
      'On-premise Deployment Options',
    ],
    cta: 'Contact Sales',
    popular: false,
  },
];

export default function PricingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <section className="py-20">
          <div className="container mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold font-headline mb-4">Find the perfect plan</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Start for free, then upgrade as you grow. All plans include a 14-day free trial.
            </p>
          </div>
        </section>

        <section className="pb-20">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {tiers.map((tier, index) => (
                <div key={tier.name} className="animate-in fade-in slide-in-from-bottom-8 duration-700" style={{animationDelay: `${index * 150}ms`}}>
                  <Card className={`flex flex-col h-full ${tier.popular ? 'border-primary shadow-lg' : ''}`}>
                    <CardHeader>
                      {tier.popular && (
                        <div className="text-primary font-semibold text-sm">MOST POPULAR</div>
                      )}
                      <CardTitle className="font-headline text-2xl mt-2">{tier.name}</CardTitle>
                      <CardDescription>{tier.description}</CardDescription>
                      <div>
                        <span className="text-4xl font-bold">{tier.price}</span>
                        <span className="text-muted-foreground">{tier.pricePeriod}</span>
                      </div>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <ul className="space-y-3">
                        {tier.features.map((feature) => (
                          <li key={feature} className="flex items-center">
                            <Check className="h-4 w-4 text-primary mr-2" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full" variant={tier.popular ? 'default' : 'outline'}>
                        {tier.cta}
                      </Button>
                    </CardFooter>
                  </Card>
                 </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
