import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/google-genai';

// Define and export the model to ensure consistency.
export const geminiFlash = 'googleai/gemini-1.5-flash-latest';

export const ai = genkit({
  plugins: [
    googleAI({apiKey: process.env.GEMINI_API_KEY}),
  ],
  // Set the default model for the AI instance.
  model: geminiFlash,
});
