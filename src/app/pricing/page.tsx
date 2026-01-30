import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Check } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const tiers = [
  {
    name: 'Free',
    price: '$0',
    pricePeriod: '',
    description: 'For trying out the core features with limited usage.',
    features: [
      'Limited AI Generations',
      'Basic Templates',
      'Strategy Planner Access',
      'Community Access',
    ],
    cta: 'Get Started for Free',
    popular: false,
  },
  {
    name: 'Basic',
    price: '$19',
    pricePeriod: '/ month',
    description: 'For unlimited basic generations and access to all templates.',
    features: [
      'Unlimited Basic Generations',
      'Access to All Templates',
      'Pitch Deck Generator',
      'Financial Summary Tool',
    ],
    cta: 'Choose Basic',
    popular: true,
  },
  {
    name: 'Premium',
    price: '$49',
    pricePeriod: '/ month',
    description: 'Unlock exports, advanced AI, and get priority support.',
    features: [
      'All Basic features',
      'Advanced AI Models',
      'Unlimited Document Exports',
      'Priority Email Support',
    ],
    cta: 'Choose Premium',
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
              Start for free, then upgrade as you grow. All paid plans include a 14-day free trial.
            </p>
          </div>
        </section>

        <section className="pb-20">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {tiers.map((tier, index) => (
                <div key={tier.name} className="animate-in fade-in slide-in-from-bottom-8 duration-700" style={{animationDelay: `${index * 150}ms`}}>
                  <Card className={`flex flex-col h-full ${tier.popular ? 'border-accent shadow-lg' : ''}`}>
                    <CardHeader>
                      {tier.popular && (
                        <div className="text-accent font-semibold text-sm">MOST POPULAR</div>
                      )}
                      <CardTitle className="font-headline text-2xl mt-2">{tier.name}</CardTitle>
                      <CardDescription>{tier.description}</CardDescription>
                      <div>
                        <span className="text-4xl font-bold">{tier.price}</span>
                        {tier.pricePeriod && <span className="text-muted-foreground">{tier.pricePeriod}</span>}
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
                      <Button asChild className="w-full" variant={tier.popular ? 'default' : 'outline'}>
                        <Link href="/signup">{tier.cta}</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                 </div>
              ))}
            </div>
          </div>
        </section>

        <section id="faq" className="py-20 bg-secondary">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold font-headline mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-12">
              Have questions? We've got answers.
            </p>
            <div className="max-w-3xl mx-auto text-left">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>What's included in the Premium plan?</AccordionTrigger>
                  <AccordionContent>
                    The Premium plan includes everything in Basic, plus access to our most advanced AI models for higher quality generation, unlimited exports of your documents (like pitch decks), and priority email support, so your questions get answered faster.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>Can I change my plan later?</AccordionTrigger>
                  <AccordionContent>
                    Yes, you can upgrade or downgrade your plan at any time from your account settings. Prorated charges or credits will be applied automatically.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>Is there a free trial for paid plans?</AccordionTrigger>
                  <AccordionContent>
                    Yes, both our Basic and Premium plans come with a 14-day free trial. You can explore all the features of the selected plan without any commitment. We also have a 'Free' tier with limited usage if you want to try things out at your own pace.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                  <AccordionTrigger>What happens if I exceed my limits on the Free plan?</AccordionTrigger>
                  <AccordionContent>
                    On the Free plan, you have a limited number of AI generations per month. If you reach your limit, you will be prompted to upgrade to a paid plan to continue using the AI features. Your existing documents will always be accessible.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
