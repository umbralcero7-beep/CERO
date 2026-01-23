
/**
 * @fileoverview Defines the data structure for a Reading Reflection.
 * A reading reflection is a user's personal note or thought associated with a specific passage in a book.
 */

import { z } from 'zod';

// Zod schema for validation
export const ReadingReflectionSchema = z.object({
  id: z.string().describe('The unique identifier for the reflection.'),
  userId: z.string().describe('The ID of the user who created the reflection.'),
  bookId: z.string().describe('The ID or title of the book this reflection belongs to.'),
  // Optional: For EPUBs, a CFI can be used to pinpoint the exact location.
  cfi: z.string().optional().describe('The EPUB Canonical Fragment Identifier for the highlighted text.'), 
  highlightedText: z.string().describe('The specific passage of text that was highlighted by the user.'),
  reflectionText: z.string().describe('The user\'s personal reflection or note on the passage.'),
  createdAt: z.date().describe('The timestamp of when the reflection was created.'),
});

// TypeScript type inferred from the Zod schema
export type ReadingReflection = z.infer<typeof ReadingReflectionSchema>;

/**
 * Example of a ReadingReflection object:
 * 
 * const exampleReflection: ReadingReflection = {
 *   id: 'reflect_12345',
 *   userId: 'user_abcde',
 *   bookId: 'the-power-of-now',
 *   cfi: 'epubcfi(/6/8[chapter_2]!/4/2/1:0)',
 *   highlightedText: 'The primary cause of unhappiness is never the situation but your thoughts about it.',
 *   reflectionText: 'This reminds me that I have control over my own happiness by managing my thoughts.',
 *   createdAt: new Date(),
 * };
 */
