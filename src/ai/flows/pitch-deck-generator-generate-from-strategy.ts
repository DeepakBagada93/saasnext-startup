'use server';

/**
 * @fileOverview A pitch deck generator AI agent that generate a pitch deck from strategy data.
 *
 * - generatePitchDeckFromStrategy - A function that generates a pitch deck from strategy data.
 * - GeneratePitchDeckFromStrategyInput - The input type for the generatePitchDeckFromStrategy function.
 * - GeneratePitchDeckFromStrategyOutput - The return type for the generatePitchDeckFromStrategy function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GeneratePitchDeckFromStrategyInputSchema = z.object({
  strategyData: z.string().describe('The strategy data inputted by the founder.'),
});
export type GeneratePitchDeckFromStrategyInput = z.infer<typeof GeneratePitchDeckFromStrategyInputSchema>;

const GeneratePitchDeckFromStrategyOutputSchema = z.object({
  pitchDeck: z.string().describe('The generated pitch deck content.'),
});
export type GeneratePitchDeckFromStrategyOutput = z.infer<typeof GeneratePitchDeckFromStrategyOutputSchema>;

export async function generatePitchDeckFromStrategy(input: GeneratePitchDeckFromStrategyInput): Promise<GeneratePitchDeckFromStrategyOutput> {
  return generatePitchDeckFromStrategyFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generatePitchDeckFromStrategyPrompt',
  input: {schema: GeneratePitchDeckFromStrategyInputSchema},
  output: {schema: GeneratePitchDeckFromStrategyOutputSchema},
  prompt: `You are an expert in creating visually appealing and investor-ready pitch decks for startup founders.
  Based on the following strategy data, generate a compelling pitch deck.
  Strategy Data: {{{strategyData}}}`,
});

const generatePitchDeckFromStrategyFlow = ai.defineFlow(
  {
    name: 'generatePitchDeckFromStrategyFlow',
    inputSchema: GeneratePitchDeckFromStrategyInputSchema,
    outputSchema: GeneratePitchDeckFromStrategyOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
