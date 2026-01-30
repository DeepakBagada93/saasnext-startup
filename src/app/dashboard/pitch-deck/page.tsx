'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { generatePitchDeckFromStrategy } from '@/ai/flows/pitch-deck-generator-generate-from-strategy';
import { useState } from 'react';
import { Loader2, Presentation, Wand2 } from 'lucide-react';

const formSchema = z.object({
  strategyData: z.string().min(50, 'Please provide more detailed strategy data.').max(5000),
});

type FormData = z.infer<typeof formSchema>;

export default function PitchDeckPage() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      strategyData: '',
    },
  });

  async function onSubmit(values: FormData) {
    setIsSubmitting(true);
    setResult(null);
    try {
      const response = await generatePitchDeckFromStrategy(values);
      setResult(response.pitchDeck);
      form.reset(); // Also update result textarea
      form.setValue('strategyData', response.pitchDeck);
      toast({ title: 'Pitch deck generated successfully!' });
    } catch (error) {
      console.error(error);
      toast({
        title: 'Error generating pitch deck',
        description: 'An unexpected error occurred. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="animate-in fade-in-50 duration-500">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-2xl flex items-center gap-2">
            <Wand2 className="h-6 w-6 text-primary" />
            Pitch Deck Generator
          </CardTitle>
          <CardDescription>
            Input your strategy data, and our AI will generate a compelling pitch deck. You can then edit it below.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="strategyData"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Strategy Data & Generated Pitch Deck</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Paste your business plan, strategy notes, or key talking points here. Your generated pitch deck will also appear here for editing." 
                        {...field} 
                        rows={result ? 20 : 10} 
                        className="transition-all duration-300"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex gap-4">
                <Button type="submit" className="flex-1" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    'Generate Pitch Deck'
                  )}
                </Button>
                <Button variant="secondary" className="flex-1" disabled={!result}>
                  Download as PDF
                </Button>
              </div>
            </form>
          </Form>
           {!result && !isSubmitting && (
                <div className="mt-8 flex flex-col items-center justify-center text-center p-8 border-2 border-dashed rounded-lg">
                    <div className="p-4 bg-secondary rounded-full mb-4">
                        <Presentation className="h-10 w-10 text-muted-foreground" />
                    </div>
                    <p className="text-muted-foreground">Your investor-ready pitch deck starts here.</p>
                </div>
            )}
        </CardContent>
      </Card>
    </div>
  );
}
