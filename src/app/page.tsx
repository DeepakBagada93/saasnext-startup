import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { ArrowRight, BrainCircuit, Presentation, AreaChart, Package } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const features = [
  {
    icon: <BrainCircuit className="h-8 w-8 text-primary" />,
    title: 'Strategy Planning',
    description: 'Craft comprehensive business strategies with AI-suggested frameworks and market insights tailored to your vision.',
  },
  {
    icon: <Presentation className="h-8 w-8 text-primary" />,
    title: 'Pitch Deck Generator',
    description: 'Automatically generate visually appealing and editable pitch decks from your strategy data, ready for investors.',
  },
  {
    icon: <AreaChart className="h-8 w-8 text-primary" />,
    title: 'Financial Summary',
    description: 'Generate key financial reports like revenue projections and cost analysis with our AI-powered tool.',
  },
  {
    icon: <Package className="h-8 w-8 text-primary" />,
    title: 'Investor Materials',
    description: 'Compile all your vital documents into a single, shareable package for potential investors.',
  },
];

const testimonials = [
  {
    quote: "Startup Ally has been a game-changer for us. The AI-powered strategy suggestions helped us pivot and find our perfect market fit.",
    name: "Alex Johnson",
    title: "Founder, TechSavvy",
    avatarId: 'user-avatar-1',
  },
  {
    quote: "As a solo founder, I wear many hats. This tool is like having a co-founder for strategy and fundraising. The pitch deck generator saved me weeks of work.",
    name: "Samantha Lee",
    title: "CEO, Innovate Co.",
    avatarId: 'user-avatar-2',
  },
  {
    quote: "The financial summary tool gave us the clarity we needed to present our numbers to investors with confidence. Highly recommended!",
    name: "David Chen",
    title: "Co-Founder, DataDriven",
    avatarId: 'user-avatar-3',
  },
];

export default function HomePage() {  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-24 md:py-32">
          <div className="container mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold font-headline mb-4 animate-in fade-in slide-in-from-bottom-4 duration-1000">
              Your 24/7 AI Chief of Staff for Founders
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8 animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-200">
              Plan strategies, generate pitch decks, and more with simple prompts.
            </p>
            <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-400">
              <Button size="lg" asChild>
                <Link href="/signup">
                  Get Started
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 bg-secondary">
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
                      <div className="bg-primary/10 p-3 rounded-full w-fit">
                        {feature.icon}
                      </div>
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

        {/* Testimonials Section */}
        <section className="py-20">
            <div className="container mx-auto text-center">
                <h2 className="text-3xl md:text-4xl font-bold font-headline mb-4">Loved by Founders Worldwide</h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-12">
                    Don&apos;t just take our word for it. Here&apos;s what founders are saying.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => {
                        const avatar = PlaceHolderImages.find(img => img.id === testimonial.avatarId);
                        return (
                            <Card key={index} className="text-left p-6 flex flex-col">
                                <CardContent className="p-0 pb-6 flex-grow">
                                    <p className="text-card-foreground">&quot;{testimonial.quote}&quot;</p>
                                </CardContent>
                                <CardHeader className="p-0 flex-row items-center gap-4">
                                    <Avatar className="h-12 w-12">
                                        {avatar && <AvatarImage src={avatar.imageUrl} alt={testimonial.name} data-ai-hint={avatar.imageHint || ''} />}
                                        <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="font-semibold">{testimonial.name}</p>
                                        <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                                    </div>
                                </CardHeader>
                            </Card>
                        );
                    })}
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
