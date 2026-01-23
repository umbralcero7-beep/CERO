'use server';

/**
 * @fileOverview Provides personalized recommendations for habits and readings based on the user's mood.
 *
 * - getPersonalizedRecommendations - A function that takes mood and journal text and returns recommendations.
 * - PersonalizedRecommendationsInput - The input type for the getPersonalizedRecommendations function.
 * - PersonalizedRecommendationsOutput - The return type for the getPersonalizedRecommendations function.
 */

// Import geminiFlash from the central config file
import {ai, geminiFlash} from '@/ai/genkit';
import {z} from 'genkit';
import { libraryItems } from '@/lib/data';

const bookSchema = z.object({
  title: z.string(),
  author: z.string(),
});

// Simplified Input Schema (no voiceAnalysis)
const PersonalizedRecommendationsInputSchema = z.object({
  mood: z.string().describe('The current mood of the user.'),
  journalText: z.string().optional().describe("The user's journal entry, if provided."),
  books: z.array(bookSchema).describe('A list of available books in the library.'),
});
export type PersonalizedRecommendationsInput = z.infer<
  typeof PersonalizedRecommendationsInputSchema
>;

const PersonalizedRecommendationsOutputSchema = z.object({
  inspirationalPhrase: z
    .string()
    .describe('Una frase empática y motivadora corta (1-2 líneas) basada en el estado de ánimo y el diario del usuario.'),
  habitRecommendation: z
    .string()
    .describe('Un hábito simple y accionable basado en la situación del usuario.'),
  readingRecommendation: z
    .string()
    .describe('Un libro de la biblioteca que sea relevante para la situación actual del usuario. Formato: "Título por Autor".'),
  symbolicPhrase: z
    .string()
    .describe('Una frase corta, poética y simbólica que actúe como un "eco" empático de los pensamientos del usuario. Ejemplo: "Incluso en la quietud, tu luz sigue brillando.'),
});
export type PersonalizedRecommendationsOutput = z.infer<
  typeof PersonalizedRecommendationsOutputSchema
>;

export async function getPersonalizedRecommendations(
  input: Omit<PersonalizedRecommendationsInput, 'books'>
): Promise<PersonalizedRecommendationsOutput> {
  const books = libraryItems.map(({ title, author }) => ({ title, author }));
  return personalizedRecommendationsFlow({ ...input, books });
}

// Simplified Prompt (no voice analysis)
const prompt = ai.definePrompt({
  name: 'personalizedRecommendationsPrompt',
  // Explicitly set the model to the one defined in genkit.ts
  model: geminiFlash,
  input: {schema: PersonalizedRecommendationsInputSchema},
  output: {schema: PersonalizedRecommendationsOutputSchema},
  prompt: `Eres Cero, un asistente de IA excepcionalmente empático y experto en bienestar. Tu objetivo es proporcionar apoyo profundo y personalizado.

Un usuario ha compartido cómo se siente.
- Estado de ánimo: {{{mood}}}
{{#if journalText}}
- Pensamientos: {{{journalText}}}
{{/if}}

Tu tarea es responder con un único objeto JSON que se adhiera al siguiente esquema. No añadas texto ni explicaciones fuera del objeto JSON.
\`\`\`json
{
  "inspirationalPhrase": "Una frase empática y motivadora corta (1-2 líneas) basada en el estado de ánimo y el diario del usuario.",
  "habitRecommendation": "Un hábito simple y accionable basado en la situación del usuario.",
  "readingRecommendation": "Un libro de la biblioteca que sea relevante para la situación actual del usuario. Formato: 'Título por Autor'.",
  "symbolicPhrase": "Una frase corta, poética y simbólica que actúe como un 'eco' empático de los pensamientos del usuario. Debe ser como un espejo, reflejando el tono y el sentimiento de su entrada en el diario. Por ejemplo, si el usuario se siente 'cansado pero esperanzado', una buena frase sería: 'Incluso en la quietud, tu luz sigue brillando.'"
}
\`\`\`

Analiza profundamente el estado de ánimo y los pensamientos del usuario para generar los valores para cada campo.
Para 'readingRecommendation', elige el libro más relevante de la siguiente lista. Varía tus sugerencias.

Libros disponibles:
{{#each books}}
- {{{this.title}}} por {{{this.author}}}
{{/each}}`,
});

const personalizedRecommendationsFlow = ai.defineFlow(
  {
    name: 'personalizedRecommendationsFlow',
    inputSchema: PersonalizedRecommendationsInputSchema,
    outputSchema: PersonalizedRecommendationsOutputSchema,
  },
  async input => {
    if (!process.env.GEMINI_API_KEY) {
      console.error('GEMINI_API_KEY environment variable not set.');
      return {
        inspirationalPhrase: 'Error de Configuración: La clave de API para el servicio de IA no está definida.',
        habitRecommendation: 'Añade tu clave en un archivo .env para recibir sugerencias.',
        readingRecommendation: 'Inténtalo de nuevo después de configurar la clave.',
        symbolicPhrase: 'La conexión con tu guía interior está esperando.',
      };
    }
    try {
      const {output} = await prompt(input);
      return output!;
    } catch (e) {
      console.error('AI recommendation flow failed, providing fallback:', e);
      if (e instanceof Error && (e.message.includes('API key') || e.message.includes('authentication'))) {
         return {
          inspirationalPhrase: 'Error de autenticación con la IA.',
          habitRecommendation: 'La clave de API podría no ser válida.',
          readingRecommendation: 'Por favor, verifica tu configuración.',
          symbolicPhrase: 'Parece que hay una interferencia en la señal.',
        };
      }
      // Return a default recommendation that is more random
      const fallbackBook = libraryItems[Math.floor(Math.random() * libraryItems.length)] || { title: 'un libro', author: 'un autor' };
      return {
        inspirationalPhrase: 'Recuerda ser amable contigo mismo. Cada día es una nueva oportunidad.',
        habitRecommendation: 'Dedica 5 minutos a la lectura consciente.',
        readingRecommendation: `${fallbackBook.title} por ${fallbackBook.author}`,
        symbolicPhrase: 'Cada momento es un nuevo comienzo.',
      };
    }
  }
);
