'use client';

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { generateReportsAndDashboards, GenerateReportsAndDashboardsOutput } from '@/ai/flows/financial-summary-tool-generate-reports-and-dashboards';
import { useState } from 'react';
import { Loader2, AreaChart, Wand2, FileText } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';


const reportTypes = [
  { id: 'revenue-projections', label: 'Revenue Projections' },
  { id: 'cost-analysis', label: 'Cost Analysis' },
  { id: 'profit-and-loss', label: 'Profit & Loss Statement' },
  { id: 'cash-flow-forecast', label: 'Cash Flow Forecast' },
] as const;


const formSchema = z.object({
  uploadedData: z.string().min(20, 'Please provide some financial data, e.g., from a CSV.').max(5000),
  companyDescription: z.string().min(10, 'Please provide a brief company description.').max(1000),
  reportTypes: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: 'You have to select at least one report type.',
  }),
});

type FormData = z.infer<typeof formSchema>;

export default function FinancialSummaryPage() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<GenerateReportsAndDashboardsOutput | null>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      uploadedData: '',
      companyDescription: '',
      reportTypes: ['revenue-projections', 'cost-analysis'],
    },
  });

  async function onSubmit(values: FormData) {
    setIsSubmitting(true);
    setResult(null);
    try {
      const response = await generateReportsAndDashboards(values);
      setResult(response);
      toast({ title: 'Financial reports generated successfully!' });
    } catch (error) {
      console.error(error);
      toast({
        title: 'Error generating reports',
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
            Financial Summary Tool
          </CardTitle>
          <CardDescription>
            Input your data and select desired reports for an AI-powered financial summary.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="uploadedData"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Financial Data</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Paste financial data here (e.g., from a CSV file)." {...field} rows={8} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="companyDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Briefly describe your company and business model." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="reportTypes"
                render={() => (
                    <FormItem>
                        <div className="mb-4">
                            <FormLabel className="text-base">Report Types</FormLabel>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            {reportTypes.map((item) => (
                                <FormField
                                    key={item.id}
                                    control={form.control}
                                    name="reportTypes"
                                    render={({ field }) => {
                                    return (
                                        <FormItem
                                        key={item.id}
                                        className="flex flex-row items-start space-x-3 space-y-0"
                                        >
                                        <FormControl>
                                            <Checkbox
                                            checked={field.value?.includes(item.id)}
                                            onCheckedChange={(checked) => {
                                                return checked
                                                ? field.onChange([...field.value, item.id])
                                                : field.onChange(
                                                    field.value?.filter(
                                                        (value) => value !== item.id
                                                    )
                                                    )
                                            }}
                                            />
                                        </FormControl>
                                        <FormLabel className="font-normal">
                                            {item.label}
                                        </FormLabel>
                                        </FormItem>
                                    )
                                    }}
                                />
                                ))}
                        </div>
                        <FormMessage />
                    </FormItem>
                )}
                />
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating Reports...
                  </>
                ) : (
                  'Generate Reports'
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      
      <div className="md:sticky top-6">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline text-2xl">Generated Reports</CardTitle>
            <CardDescription>
              Your financial reports and dashboard data will appear here.
            </CardDescription>
          </CardHeader>
          <CardContent className="min-h-[400px]">
             {isSubmitting && (
              <div className="flex flex-col items-center justify-center h-full">
                <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
                <p className="text-muted-foreground">Crunching the numbers...</p>
              </div>
            )}
            {result && (
              <Accordion type="single" collapsible defaultValue={Object.keys(result.reports)[0]} className="w-full animate-in fade-in-50 duration-500">
                {Object.entries(result.reports).map(([title, content]) => (
                  <AccordionItem value={title} key={title}>
                    <AccordionTrigger>{title}</AccordionTrigger>
                    <AccordionContent className="whitespace-pre-wrap text-muted-foreground">
                      {content}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            )}
             {!isSubmitting && !result && (
                <div className="flex flex-col items-center justify-center h-full text-center">
                    <div className="p-4 bg-secondary rounded-full mb-4">
                        <AreaChart className="h-10 w-10 text-muted-foreground" />
                    </div>
                    <p className="text-muted-foreground">Insights from your financial data await.</p>
                </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
