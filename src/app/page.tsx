import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { ArrowRight, BrainCircuit, Presentation, AreaChart, Package } from 'lucide-react';

const features = [
  {
    icon: <BrainCircuit className="h-8 w-8 text-primary" />,
    title: 'Strategy Planner',
    description: 'Craft comprehensive business strategies with AI-suggested frameworks and market insights tailored to your vision.',
    image: PlaceHolderImages.find(img => img.id === 'strategy-planner-feature'),
  },
  {
    icon: <Presentation className="h-8 w-8 text-primary" />,
    title: 'Pitch Deck Generator',
    description: 'Automatically generate visually appealing and editable pitch decks from your strategy data, ready for investors.',
    image: PlaceHolderImages.find(img => img.id === 'pitch-deck-feature'),
  },
  {
    icon: <AreaChart className="h-8 w-8 text-primary" />,
    title: 'Financial Summary',
    description: 'Generate key financial reports like revenue projections and cost analysis with our AI-powered tool.',
    image: PlaceHolderImages.find(img => img.id === 'financial-summary-feature'),
  },
  {
    icon: <Package className="h-8 w-8 text-primary" />,
    title: 'Investor Materials',
    description: 'Compile all your vital documents into a single, shareable package for potential investors.',
    image: PlaceHolderImages.find(img => img.id === 'investor-materials-feature'),
  },
];

export default function HomePage() {
  const heroImage = PlaceHolderImages.find(img => img.id === 'hero-background');
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 bg-secondary">
          <div className="container mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold font-headline mb-4 animate-in fade-in slide-in-from-bottom-4 duration-1000">
              Your AI Digital Chief of Staff
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8 animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-200">
              Startup Ally provides AI-powered tools to help you build, strategize, and secure funding for your venture. Focus on your vision, we&apos;ll handle the rest.
            </p>
            <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-400">
              <Button size="lg" asChild>
                <Link href="/signup">
                  Get Started for Free <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold font-headline mb-4">The Founder&apos;s Toolkit, Reimagined</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-12">
              All the strategic tools you need, supercharged by AI.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <div key={feature.title} className="animate-in fade-in slide-in-from-bottom-8 duration-700" style={{animationDelay: `${index * 150}ms`}}>
                  <Card className="text-left h-full hover:shadow-lg transition-shadow">
                    <CardHeader>
                      {feature.icon}
                      <CardTitle className="mt-4 font-headline">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{feature.description}</p>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Final CTA */}
        <section className="bg-secondary py-20">
          <div className="container mx-auto text-center">
             <h2 className="text-3xl md:text-4xl font-bold font-headline mb-4">Ready to Accelerate Your Startup?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Join hundreds of founders who are building smarter, not harder.
            </p>
            <Button size="lg" asChild>
              <Link href="/signup">
                Start Building Today <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
