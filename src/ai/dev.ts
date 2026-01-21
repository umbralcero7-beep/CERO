'use server';
import { config } from 'dotenv';
config({ path: '.env' });

import '@/ai/flows/personalized-recommendations.ts';
import '@/ai/flows/suggest-habits.ts';
import '@/ai/flows/chat-with-book.ts';
import '@/ai/flows/analyze-journal-entry.ts';
