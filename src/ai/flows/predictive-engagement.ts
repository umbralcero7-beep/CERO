import { ai } from '../genkit';
import { gemini15Flash } from '@genkit-ai/googleai';
import { z } from 'zod';

// Define the schema for the AI's output
const ProactiveMessageOutput = z.object({
    shouldDisplay: z.boolean().describe('Whether a clear pattern was found and a message should be displayed.'),
    message: z.string().describe('The proactive, personalized message for the user. Should be empty if shouldDisplay is false.')
});

export const predictiveEngagementFlow = ai.defineFlow(
  {
    name: 'predictiveEngagementFlow',
    inputSchema: z.object({
        // An array of past mood entries
        history: z.array(z.object({
            date: z.string(),
            mood: z.string()
        })),
        userName: z.string()
    }),
    outputSchema: ProactiveMessageOutput,
  },
  async ({ history, userName }) => {

    const historyString = history.map(entry => `On ${entry.date}, the user felt ${entry.mood}.`).join('\n');

    const prompt = `
        You are Cero, a compassionate and insightful AI well-being companion.
        Your task is to proactively support your user, ${userName}, by identifying recurring emotional patterns from their mood history.

        Analyze the following mood log. Look for patterns related to days of the week, frequency of certain moods, or any other notable trends.

        User's Mood History:
        ${historyString}

        Your Goal:
        1.  **Identify a strong pattern.** For example: "The user often feels stressed on Mondays," or "The user has reported feeling tired for three consecutive days."
        2.  **If a pattern is found:**
            *   Craft a short, empathetic, and proactive message for ${userName}.
            *   The message should acknowledge the pattern gently and offer a specific, simple, and helpful suggestion.
            *   The suggestion could be to use a feature from the app (like a breathing exercise, journaling, or a specific reading).
            *   Frame it as a question to encourage engagement.
            *   Example: "Hi ${userName}, I've noticed you've been feeling a bit tired lately. Would you like to try a quick 5-minute guided meditation from our library to help recharge?"
            *   Another Example: "Hi ${userName}, I see that Mondays can sometimes be a bit stressful. How about we start the day with a short breathing exercise to find some calm?"
        3.  **If no clear or significant pattern is found:** Do not invent one. It's crucial to be genuine. Simply set shouldDisplay to false.

        Based on your analysis, decide if a message should be displayed and what that message should be.
    `;

    const llmResponse = await ai.generate({
      model: gemini15Flash,
      prompt,
      output: {
          schema: ProactiveMessageOutput
      },
      config: {
        temperature: 0.7, // Allows for creative, but grounded, phrasing
      },
    });

    return llmResponse;
  }
);
