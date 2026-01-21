'use server';

/**
 * @fileOverview Provides personalized recommendations for habits and readings based on the user's mood.
 *
 * - getPersonalizedRecommendations - A function that takes a mood as input and returns personalized habit and reading recommendations.
 * - PersonalizedRecommendationsInput - The input type for the getPersonalizedRecommendations function.
 * - PersonalizedRecommendationsOutput - The return type for the getPersonalizedRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { libraryItems } from '@/lib/data';

const bookSchema = z.object({
  title: z.string(),
  author: z.string(),
});

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
    .describe("Una frase empática y motivadora corta (1-2 líneas) basada en el estado de ánimo y el diario del usuario."),
  habitRecommendation: z
    .string()
    .describe('Un hábito simple y accionable basado en la situación del usuario.'),
  readingRecommendation: z
    .string()
    .describe('Un libro de la biblioteca que sea relevante para la situación actual del usuario. Formato: "Título por Autor".'),
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

const prompt = ai.definePrompt({
  name: 'personalizedRecommendationsPrompt',
  input: {schema: PersonalizedRecommendationsInputSchema},
  output: {schema: PersonalizedRecommendationsOutputSchema},
  prompt: `Eres Cero, un asistente de IA empático y experto en bienestar. Tu objetivo es proporcionar apoyo personalizado y accionable que sea dinámico y variado.

Un usuario ha compartido cómo se siente.
- Estado de ánimo: {{{mood}}}
{{#if journalText}}
- Pensamientos en su diario: {{{journalText}}}
{{/if}}

Tu tarea es responder con tres cosas, en este orden:
1.  **Frase Inspiradora**: Basado en su estado de ánimo y su diario, escribe una frase corta (1-2 líneas), empática y poderosa que se sienta genuina y no genérica.
2.  **Sugerir un Hábito**: Basado en su situación, sugiere un hábito simple, concreto y accionable para contrarrestar su estado de ánimo actual. Por ejemplo, si el usuario está **triste**, sugiere algo como "Ponte unos auriculares y escucha tu canción favorita, esa que siempre te levanta el ánimo" o "Sal a caminar 5 minutos para despejar la mente". Si está **estresado**, sugiere "Tómate 3 minutos para hacer respiraciones profundas y lentas". Evita sugerencias genéricas.
3.  **Sugerir una Lectura**: Analiza profundamente el estado de ánimo y los pensamientos del usuario. Elige el libro de la siguiente lista que sea **el más relevante y útil** para su situación actual. Por ejemplo, si el usuario se siente perdido o sin propósito, 'El sutil arte de que (no) te importe nada' podría ser una buena opción. Si se siente abrumado, 'El poder del ahora' podría ayudarle. **Es crucial que varíes tus sugerencias y no recomiendes siempre el mismo libro.** Formatea tu respuesta como "Título por Autor".

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
        };
      }
      // Return a default recommendation that is more random
      const fallbackBook = libraryItems[Math.floor(Math.random() * libraryItems.length)] || { title: 'un libro', author: 'un autor' };
      return {
        inspirationalPhrase: 'Recuerda ser amable contigo mismo. Cada día es una nueva oportunidad.',
        habitRecommendation: 'Dedica 5 minutos a la lectura consciente.',
        readingRecommendation: `${fallbackBook.title} por ${fallbackBook.author}`,
      };
    }
  }
);
