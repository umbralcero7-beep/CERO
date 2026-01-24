import { genkit } from 'genkit';
import { googleAI, gemini15Flash } from '@genkit-ai/googleai';

export const ai = genkit({
  plugins: [
    googleAI(),
  ],
});

// Exporta el modelo específicamente para usarlo en otros archivos
export const geminiFlash = gemini15Flash;