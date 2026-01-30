'use server';
/**
 * @fileOverview This file defines the Genkit flow for generating strategy framework suggestions.
 *
 * It includes:
 * - generateFrameworkSuggestions - A function that calls the strategyFrameworkSuggestionFlow.
 * - StrategyFrameworkSuggestionInput - The input type for the generateFrameworkSuggestions function.
 * - StrategyFrameworkSuggestionOutput - The return type for the generateFrameworkSuggestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const StrategyFrameworkSuggestionInputSchema = z.object({
  businessDescription: z
    .string()
    .describe('A detailed description of the business and its goals.'),
  targetMarket: z.string().describe('Description of the target market.'),
  competitiveLandscape: z
    .string()
    .describe('Overview of the competitive landscape.'),
});
export type StrategyFrameworkSuggestionInput = z.infer<
  typeof StrategyFrameworkSuggestionInputSchema
>;

const StrategyFrameworkSuggestionOutputSchema = z.object({
  suggestedFrameworks: z
    .array(z.string())
    .describe('A list of suggested business frameworks.'),
  marketInsights: z.string().describe('Relevant market insights.'),
});
export type StrategyFrameworkSuggestionOutput = z.infer<
  typeof StrategyFrameworkSuggestionOutputSchema
>;

export async function generateFrameworkSuggestions(
  input: StrategyFrameworkSuggestionInput
): Promise<StrategyFrameworkSuggestionOutput> {
  return strategyFrameworkSuggestionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'strategyFrameworkSuggestionPrompt',
  input: {schema: StrategyFrameworkSuggestionInputSchema},
  output: {schema: StrategyFrameworkSuggestionOutputSchema},
  prompt: `You are an expert strategy consultant. Based on the information provided by the founder, suggest relevant business frameworks and market insights that can help them develop a comprehensive business strategy.

Business Description: {{{businessDescription}}}
Target Market: {{{targetMarket}}}
Competitive Landscape: {{{competitiveLandscape}}}

Respond in the format:
\`\`\`json
{
  "suggestedFrameworks": ["Framework 1", "Framework 2"],
  "marketInsights": "Relevant market insights..."
}
\`\`\``,
});

const strategyFrameworkSuggestionFlow = ai.defineFlow(
  {
    name: 'strategyFrameworkSuggestionFlow',
    inputSchema: StrategyFrameworkSuggestionInputSchema,
    outputSchema: StrategyFrameworkSuggestionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
