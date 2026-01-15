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
  output: {schema: z.object({
    readingRecommendation: z
    .string()
    .describe('A recommended reading based on the user\'s mood.'),
  })},
  prompt: `Eres Cero, un asistente de IA. Un usuario ha indicado que se siente {{{mood}}}.

Sugiere una lectura que le sería de gran ayuda en este momento.

Recomendación de Lectura: Elige uno de los siguientes libros que sea el más adecuado para el estado de ánimo del usuario. Devuelve solo el título y el autor del libro.

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
    const {output} = await prompt(input);
    const reading = output!.readingRecommendation;
    const bookTitle = reading.split(' por ')[0];
    
    return {
      readingRecommendation: reading,
      habitRecommendation: `Dedícale 5 minutos de lectura a "${bookTitle}".`,
    };
  }
);
