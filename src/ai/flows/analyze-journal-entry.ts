'use server';

/**
 * @fileOverview Provides an AI-powered analysis of a user's journal entry.
 *
 * This file defines an AI model for analyzing journal entries. It uses the
 * Genkit library to interact with a Google Gemini model, providing a structured
 * output for use in the application.
 */

import { ai, geminiFlash } from '@/ai/genkit';
import { z } from 'zod';

// Define the expected input schema for the journal analysis.
export const JournalAnalysisInputSchema = z.object({
  journalText: z.string().describe("The user's journal entry text."),
});
export type JournalAnalysisInput = z.infer<typeof JournalAnalysisInputSchema>;

// Define the expected output schema for the journal analysis.
export const JournalAnalysisOutputSchema = z.object({
  summary: z
    .string()
    .describe('A brief, empathetic summary of the journal entry.'),
  keyEmotions: z
    .array(z.string())
    .describe('A list of 1 to 3 key emotions identified in the text.'),
});
export type JournalAnalysisOutput = z.infer<typeof JournalAnalysisOutputSchema>;

/**
 * Analyzes a journal entry using the configured AI model.
 *
 * @param input The journal entry text to analyze.
 * @returns A promise that resolves to the analysis output (summary and key emotions).
 */
export async function analyzeJournalEntry(
  input: JournalAnalysisInput
): Promise<JournalAnalysisOutput> {
  // Check if the Gemini API key is set.
  if (!process.env.NEXT_PUBLIC_GEMINI_API_KEY) {
    console.error('GEMINI_API_KEY environment variable not set.');
    return {
      summary:
        'Error de Configuración: La clave de API para el servicio de IA no está definida.',
      keyEmotions: [],
    };
  }

  try {
    // Generate the analysis using the AI model.
    const response = await ai.generate({
      model: geminiFlash,
      system: `Eres un analista de IA perspicaz y empático. Tu tarea es analizar la siguiente entrada de diario.\n\nInstrucciones:\n1. Escribe un resumen breve (2-3 frases) que capture la esencia de los pensamientos y sentimientos del usuario de una manera validante, sin prejuicios y que ofrezca una perspectiva constructiva.\n2. Identifica de 1 a 3 de las emociones o sentimientos más destacados en el texto. Sé específico.`,
      prompt: { journalText: input.journalText },
      output: { schema: JournalAnalysisOutputSchema },
    });
    return response.output()!;
  } catch (e) {
    console.error('AI journal analysis flow failed, providing fallback:', e);
    if (
      e instanceof Error &&
      (e.message.includes('API key') || e.message.includes('authentication'))
    ) {
      return {
        summary:
          'Error de autenticación: La clave de API proporcionada no es válida o ha expirado.',
        keyEmotions: [],
      };
    }
    // Provide a generic fallback response if the AI fails for other reasons.
    return {
      summary:
        'Gracias por tomarte el tiempo de escribir. Reflexionar sobre tus pensamientos es un paso valioso.',
      keyEmotions: [],
    };
  }
}
