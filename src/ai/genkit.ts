import {configure, ai} from 'genkit';
import {googleAI} from '@genkit-ai/google-genai';

// 1. Instantiate the plugin
const google = googleAI({
  apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY,
});

// 2. Configure Genkit with the plugin instance
configure({
  plugins: [google],
  logLevel: 'debug',
  enableTracing: true,
});

// 3. Get a reference to the model and export it
export const geminiFlash = google.model('gemini-1.5-flash-latest');

// 4. Export the 'ai' helper
export {ai};
