'use server';

/**
 * @fileOverview Generates a dynamic summary of a property based on user interests.
 *
 * - generateDynamicPropertySummary - A function that generates the property summary.
 * - GenerateDynamicPropertySummaryInput - The input type for the generateDynamicPropertySummary function.
 * - GenerateDynamicPropertySummaryOutput - The return type for the generateDynamicPropertySummary function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateDynamicPropertySummaryInputSchema = z.object({
  propertyDetails: z
    .string()
    .describe('Detailed information about the property.'),
  userInterests: z
    .string()
    .describe("The user's specific interests regarding the property."),
});
export type GenerateDynamicPropertySummaryInput = z.infer<
  typeof GenerateDynamicPropertySummaryInputSchema
>;

const GenerateDynamicPropertySummaryOutputSchema = z.object({
  summary: z
    .string()
    .describe(
      'A concise summary of the property tailored to the user interests.'
    ),
});
export type GenerateDynamicPropertySummaryOutput = z.infer<
  typeof GenerateDynamicPropertySummaryOutputSchema
>;

export async function generateDynamicPropertySummary(
  input: GenerateDynamicPropertySummaryInput
): Promise<GenerateDynamicPropertySummaryOutput> {
  return generateDynamicPropertySummaryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateDynamicPropertySummaryPrompt',
  input: {schema: GenerateDynamicPropertySummaryInputSchema},
  output: {schema: GenerateDynamicPropertySummaryOutputSchema},
  prompt: `You are a real estate expert tasked with creating a concise property summary based on a user's specific interests.

  Property Details: {{{propertyDetails}}}
  User Interests: {{{userInterests}}}

  Generate a summary that highlights the property features most relevant to the user's stated interests. Focus on details about the building itself. Be concise and engaging. The summary should be one paragraph.
  
  If you cannot find the specific information requested by the user in the provided "Property Details", you MUST respond with the following text EXACTLY:
  "No momento não encontrei essa informação nos meus registros.
Para um atendimento rápido e completo, fale agora com nosso corretor especializado no Moment Noroeste pelo WhatsApp:
👉 Falar com o corretor
.
Ele poderá esclarecer todos os detalhes e enviar informações atualizadas diretamente para você.”
  `,
});

const generateDynamicPropertySummaryFlow = ai.defineFlow(
  {
    name: 'generateDynamicPropertySummaryFlow',
    inputSchema: GenerateDynamicPropertySummaryInputSchema,
    outputSchema: GenerateDynamicPropertySummaryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
