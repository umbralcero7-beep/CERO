
'use server';

/**
 * @fileOverview Sugiere hábitos personalizados basados en las respuestas de un cuestionario de onboarding.
 *
 * - suggestHabits: Función que toma las respuestas y devuelve sugerencias de hábitos.
 * - OnboardingInput: El tipo de entrada para la función.
 * - SuggestedHabit: El tipo para un único hábito sugerido.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const OnboardingInputSchema = z.object({
  goal: z.string().describe('El principal objetivo que el usuario quiere alcanzar.'),
  challenge: z.string().describe('El mayor desafío o preocupación actual del usuario.'),
});
export type OnboardingInput = z.infer<typeof OnboardingInputSchema>;

const SuggestedHabitSchema = z.object({
  name: z.string().describe('El nombre del hábito, corto y motivador. (Ej: "Meditación de 5 minutos")'),
  description: z.string().describe('Una descripción breve y clara de cómo realizar el hábito.'),
});
export type SuggestedHabit = z.infer<typeof SuggestedHabitSchema>;

const HabitSuggestionOutputSchema = z.array(SuggestedHabitSchema);

export async function suggestHabits(input: OnboardingInput): Promise<SuggestedHabit[]> {
  return suggestHabitsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestHabitsPrompt',
  input: { schema: OnboardingInputSchema },
  output: { schema: HabitSuggestionOutputSchema },
  prompt: `Eres Cero, un asistente de IA experto en bienestar.
Tu tarea es analizar las respuestas de un nuevo usuario y sugerir 3 hábitos simples, concretos y accionables para empezar.

Contexto del usuario:
- Objetivo principal: {{{goal}}}
- Mayor desafío actual: {{{challenge}}}

Basado en esto, genera una lista de 3 hábitos. Cada hábito debe ser:
- Sencillo de empezar (ej. "5 minutos de...", "Escribir 3 cosas...").
- Directamente relacionado con su objetivo y desafío.
- Tener un nombre motivador y una descripción clara.

No añadas introducciones ni texto adicional. Devuelve solo el array de objetos de hábitos.`,
});

const suggestHabitsFlow = ai.defineFlow(
  {
    name: 'suggestHabitsFlow',
    inputSchema: OnboardingInputSchema,
    outputSchema: HabitSuggestionOutputSchema,
  },
  async (input) => {
    if (!process.env.GEMINI_API_KEY) {
      console.error('GEMINI_API_KEY environment variable not set.');
      return [
        {
          name: 'Error de Configuración',
          description: 'La clave de API de IA no está definida. Añádela a tu archivo .env.',
        },
      ];
    }
    try {
      const { output } = await prompt(input);
      return output || [];
    } catch (e) {
        console.error('AI habit suggestion flow failed, providing fallback:', e);
        if (e instanceof Error && (e.message.includes('API key') || e.message.includes('authentication'))) {
          return [
            {
              name: 'Error de Autenticación',
              description: 'La clave de API para la IA no es válida o ha expirado.',
            },
          ];
        }
        return [
          {
            name: 'Meditación de 5 Minutos',
            description: 'Encuentra un lugar tranquilo y concéntrate en tu respiración.'
          },
          {
            name: 'Pausa de Gratitud',
            description: 'Anota una cosa por la que te sientas agradecido/a hoy.'
          },
          {
            name: 'Estiramiento Consciente',
            description: 'Tómate 2 minutos para estirar suavemente tu cuerpo y liberar tensión.'
          }
        ];
    }
  }
);
