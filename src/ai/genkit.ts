import {configure} from 'genkit';
import {googleAI} from '@genkit-ai/google-genai';

// Initialize Genkit and configure the Google AI plugin.
// This setup is automatically used by all Genkit flows.
configure({
  plugins: [
    // The API key is loaded from environment variables.
    googleAI({apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY}),
  ],
  // Log level for debugging.
  logLevel: 'debug',
  // Enable tracing for dev environments.
  enableTracing: true,
});
