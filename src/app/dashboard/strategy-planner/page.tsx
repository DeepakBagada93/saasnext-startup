'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { generateFrameworkSuggestions, StrategyFrameworkSuggestionOutput } from '@/ai/flows/strategy-planner-generate-framework-suggestions';
import { useState } from 'react';
import { Loader2, Lightbulb, BarChart3, Wand2 } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const formSchema = z.object({
  businessDescription: z.string().min(10, 'Please provide a more detailed description.').max(2000),
  targetMarket: z.string().min(10, 'Please describe your target market.').max(1000),
  competitiveLandscape: z.string().min(10, 'Please describe your competitors.').max(1000),
});

type FormData = z.infer<typeof formSchema>;

export default function StrategyPlannerPage() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<StrategyFrameworkSuggestionOutput | null>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      businessDescription: '',
      targetMarket: '',
      competitiveLandscape: '',
    },
  });

  async function onSubmit(values: FormData) {
    setIsSubmitting(true);
    setResult(null);
    try {
      const response = await generateFrameworkSuggestions(values);
      setResult(response);
      toast({ title: 'Strategy suggestions generated successfully!' });
    } catch (error) {
      console.error(error);
      toast({
        title: 'Error generating suggestions',
        description: 'An unexpected error occurred. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="grid md:grid-cols-2 gap-8 items-start animate-in fade-in-50 duration-500">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-2xl flex items-center gap-2">
            <Wand2 className="h-6 w-6 text-primary" />
            Strategy Planner
          </CardTitle>
          <CardDescription>
            Input details about your startup, and our AI will suggest strategic frameworks and market insights.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="businessDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Business Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Describe your business, its mission, and what it does." {...field} rows={5} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="targetMarket"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Target Market</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Who are your customers? What are their demographics and needs?" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="competitiveLandscape"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Competitive Landscape</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Who are your main competitors, and what are their strengths and weaknesses?" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  'Generate Suggestions'
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      
      <div className="md:sticky top-6">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline text-2xl">AI-Generated Insights</CardTitle>
            <CardDescription>
              Your suggested frameworks and market insights will appear here.
            </CardDescription>
          </CardHeader>
          <CardContent className="min-h-[400px]">
            {isSubmitting && (
              <div className="flex flex-col items-center justify-center h-full">
                <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
                <p className="text-muted-foreground">Analyzing your input...</p>
              </div>
            )}
            {result && (
              <div className="space-y-6 animate-in fade-in-50 duration-500">
                <div>
                  <h3 className="text-lg font-semibold flex items-center gap-2 mb-2">
                    <Lightbulb className="h-5 w-5 text-primary" />
                    Suggested Frameworks
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {result.suggestedFrameworks.map((framework, index) => (
                      <div key={index} className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm">
                        {framework}
                      </div>
                    ))}
                  </div>
                </div>
                <Separator />
                <div>
                  <h3 className="text-lg font-semibold flex items-center gap-2 mb-2">
                    <BarChart3 className="h-5 w-5 text-primary" />
                    Market Insights
                  </h3>
                  <p className="text-muted-foreground whitespace-pre-wrap">{result.marketInsights}</p>
                </div>
              </div>
            )}
            {!isSubmitting && !result && (
                <div className="flex flex-col items-center justify-center h-full text-center">
                    <div className="p-4 bg-secondary rounded-full mb-4">
                        <Lightbulb className="h-10 w-10 text-muted-foreground" />
                    </div>
                    <p className="text-muted-foreground">Your strategic insights are waiting.</p>
                </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
