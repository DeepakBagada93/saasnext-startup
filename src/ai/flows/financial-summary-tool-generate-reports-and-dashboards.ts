'use server';

/**
 * @fileOverview A financial summary tool that generates reports and dashboards.
 *
 * - generateReportsAndDashboards - A function that generates financial reports and dashboards.
 * - GenerateReportsAndDashboardsInput - The input type for the generateReportsAndDashboards function.
 * - GenerateReportsAndDashboardsOutput - The return type for the generateReportsAndDashboards function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateReportsAndDashboardsInputSchema = z.object({
  uploadedData: z.string().describe('The uploaded financial data, e.g. from a CSV file.'),
  companyDescription: z.string().describe('A brief description of the company and its business model.'),
  reportTypes: z
    .array(z.string())
    .describe('The types of financial reports to generate (e.g., revenue projections, cost analysis).'),
});
export type GenerateReportsAndDashboardsInput = z.infer<typeof GenerateReportsAndDashboardsInputSchema>;

const GenerateReportsAndDashboardsOutputSchema = z.object({
  reports: z.record(z.string(), z.string()).describe('A map of report type to the generated report content.'),
  dashboardData: z.string().describe('Data for interactive financial dashboards (e.g., JSON format).'),
});
export type GenerateReportsAndDashboardsOutput = z.infer<typeof GenerateReportsAndDashboardsOutputSchema>;

export async function generateReportsAndDashboards(
  input: GenerateReportsAndDashboardsInput
): Promise<GenerateReportsAndDashboardsOutput> {
  return generateReportsAndDashboardsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateReportsAndDashboardsPrompt',
  input: {schema: GenerateReportsAndDashboardsInputSchema},
  output: {schema: GenerateReportsAndDashboardsOutputSchema},
  prompt: `You are an expert financial analyst. Given the following financial data, company description, and requested report types, generate the requested financial reports and data for interactive dashboards.

Financial Data:
{{{uploadedData}}}

Company Description:
{{{companyDescription}}}

Requested Report Types:
{{#each reportTypes}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}

Generate the reports in a detailed, professional manner. Provide data suitable for interactive dashboards in JSON format.

Output the report as a JSON object where keys are the report types, and values are the generated report content. Also provide the dashboard data.`,
});

const generateReportsAndDashboardsFlow = ai.defineFlow(
  {
    name: 'generateReportsAndDashboardsFlow',
    inputSchema: GenerateReportsAndDashboardsInputSchema,
    outputSchema: GenerateReportsAndDashboardsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
