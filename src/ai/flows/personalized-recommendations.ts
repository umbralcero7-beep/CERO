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
  books: z.array(bookSchema).describe('A list of available books in the library.'),
});
export type PersonalizedRecommendationsInput = z.infer<
  typeof PersonalizedRecommendationsInputSchema
>;

const PersonalizedRecommendationsOutputSchema = z.object({
  habitRecommendation: z
    .string()
    .describe('A recommended habit based on the user\'s mood.'),
  readingRecommendation: z
    .string()
    .describe('A recommended reading based on the user\'s mood.'),
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
  prompt: `Eres Cero, un asistente de IA. Un usuario ha indicado que se siente {{{mood}}}.

Tu tarea es:
1. **Sugerir una lectura**: Elige uno de los siguientes libros que sea el más adecuado para el estado de ánimo del usuario. Formatea tu respuesta como "Título por Autor".
2. **Sugerir un hábito**: Basado en la lectura sugerida, crea un hábito simple y accionable. Por ejemplo: "Dedícale 5 minutos de lectura a '[Título del libro]'".

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
    try {
      const {output} = await prompt(input);
      return output!;
    } catch (e) {
      console.error('AI recommendation flow failed, providing fallback:', e);
      // Return a default recommendation
      const fallbackBook = libraryItems[0] || { title: 'un libro', author: 'un autor' };
      return {
        habitRecommendation: 'Dedica 5 minutos a la lectura consciente.',
        readingRecommendation: `${fallbackBook.title} por ${fallbackBook.author}`,
      };
    }
  }
);
