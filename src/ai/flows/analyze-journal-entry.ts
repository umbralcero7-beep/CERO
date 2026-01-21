'use server';

/**
 * @fileOverview Provides an AI-powered analysis of a user's journal entry.
 *
 * - analyzeJournalEntry - A function that takes journal text and returns a summary and key emotions.
 * - JournalAnalysisInput - The input type for the analyzeJournalEntry function.
 * - JournalAnalysisOutput - The return type for the analyzeJournalEntry function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const JournalAnalysisInputSchema = z.object({
  journalText: z.string().describe("The user's journal entry text."),
});
export type JournalAnalysisInput = z.infer<
  typeof JournalAnalysisInputSchema
>;

const JournalAnalysisOutputSchema = z.object({
  summary: z
    .string()
    .describe('A brief, empathetic summary of the journal entry.'),
  keyEmotions: z
    .array(z.string())
    .describe('A list of 1 to 3 key emotions identified in the text.'),
});
export type JournalAnalysisOutput = z.infer<
  typeof JournalAnalysisOutputSchema
>;

export async function analyzeJournalEntry(
  input: JournalAnalysisInput
): Promise<JournalAnalysisOutput> {
  return journalAnalysisFlow(input);
}

const prompt = ai.definePrompt({
  name: 'journalAnalysisPrompt',
  input: {schema: JournalAnalysisInputSchema},
  output: {schema: JournalAnalysisOutputSchema},
  prompt: `Eres un analista de IA perspicaz y empático. Tu tarea es analizar la siguiente entrada de diario.

Instrucciones:
1. Escribe un resumen breve (2-3 frases) que capture la esencia de los pensamientos y sentimientos del usuario de una manera validante, sin prejuicios y que ofrezca una perspectiva constructiva.
2. Identifica de 1 a 3 de las emociones o sentimientos más destacados en el texto. Sé específico.

Entrada de diario:
{{{journalText}}}`,
});

const journalAnalysisFlow = ai.defineFlow(
  {
    name: 'journalAnalysisFlow',
    inputSchema: JournalAnalysisInputSchema,
    outputSchema: JournalAnalysisOutputSchema,
  },
  async input => {
    if (!process.env.GEMINI_API_KEY) {
      console.error('GEMINI_API_KEY environment variable not set.');
      return {
        summary: 'Error de Configuración: La clave de API para el servicio de IA no está definida. Por favor, añádela a tu archivo .env para habilitar esta función.',
        keyEmotions: [],
      };
    }

    try {
      const {output} = await prompt(input);
      return output!;
    } catch (e) {
      console.error('AI journal analysis flow failed, providing fallback:', e);
      if (e instanceof Error && (e.message.includes('API key') || e.message.includes('authentication'))) {
        return {
          summary: 'Error de autenticación: La clave de API proporcionada no es válida o ha expirado.',
          keyEmotions: [],
        };
      }
      return {
          summary: 'Gracias por tomarte el tiempo de escribir. Reflexionar sobre tus pensamientos es un paso valioso.',
          keyEmotions: [],
      };
    }
  }
);
