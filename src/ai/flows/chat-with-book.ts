'use server';

/**
 * @fileOverview Provides an AI-powered chat assistant for discussing a specific book.
 *
 * - chatWithBook - A function that takes a book title and chat history to generate a response.
 * - ChatWithBookInput - The input type for the chatWithBook function.
 * - ChatWithBookOutput - The return type for the chatWithBook function.
 */

import { ai, geminiFlash } from '@/ai/genkit';
import { z } from 'genkit';
import { GenerateRequest } from 'genkit/generate';

const ChatMessageSchema = z.object({
  role: z.enum(['user', 'model']),
  content: z.string(),
});

const ChatWithBookInputSchema = z.object({
  bookTitle: z.string().describe('The title of the book being discussed.'),
  chatHistory: z.array(ChatMessageSchema).describe('The history of the conversation so far.'),
  userQuestion: z.string().describe('The latest question from the user.'),
  userLocale: z.string().describe('The locale of the user (e.g., "es" or "en").'),
});
export type ChatWithBookInput = z.infer<typeof ChatWithBookInputSchema>;

export type ChatWithBookOutput = string;

export async function chatWithBook(input: ChatWithBookInput): Promise<ChatWithBookOutput> {
  return chatWithBookFlow(input);
}

const promptTemplate = `Eres Cero, un asistente de IA experto en literatura y un compañero de lectura perspicaz. Tu tarea es ayudar a los usuarios a comprender y explorar los libros que están leyendo.

Contexto:
- Estás discutiendo el libro: "{{bookTitle}}".
- El usuario te está haciendo una pregunta en el idioma: {{userLocale}}.

Tu Tarea:
1. Responde a la pregunta del usuario de manera clara, concisa y útil.
2. Basa tus respuestas en el conocimiento general sobre el libro. No tienes acceso al texto completo, así que actúa como un experto bien informado.
3. Puedes proporcionar resúmenes de capítulos, explicar temas complejos, analizar personajes o responder a cualquier pregunta relacionada con el contenido del libro.
4. SIEMPRE responde en el idioma del usuario ({{userLocale}}). No uses inglés a menos que el usuario te escriba en inglés.

Ejemplo de respuesta si te preguntan por la idea principal de "El poder del ahora":
"La idea central de 'El poder del ahora' es que la mayoría de nuestro sufrimiento proviene de estar mentalmente atrapados en el pasado o preocupados por el futuro. Eckhart Tolle argumenta que la única forma de encontrar la paz y la verdadera felicidad es vivir plenamente en el momento presente, ya que es lo único que realmente existe."

Ahora, responde a la pregunta del usuario.`;

const chatWithBookFlow = ai.defineFlow(
  {
    name: 'chatWithBookFlow',
    inputSchema: ChatWithBookInputSchema,
    outputSchema: z.string(),
  },
  async ({ bookTitle, chatHistory, userQuestion, userLocale }) => {
    if (!process.env.GEMINI_API_KEY) {
      console.error('GEMINI_API_KEY environment variable not set.');
      return userLocale === 'es'
        ? 'Error de Configuración: La clave de API para el servicio de IA no está definida. Por favor, añádela a tu archivo .env para habilitar esta función.'
        : 'Configuration Error: The API key for the AI service is not set. Please add it to your .env file to enable this feature.';
    }

    // Manually create the system prompt by replacing placeholders
    const systemPrompt = promptTemplate
        .replace('{{bookTitle}}', bookTitle)
        .replace(/\{\{userLocale\}\}/g, userLocale); // Use regex for global replace

    // Construct messages array for the model
    const messages: GenerateRequest['messages'] = chatHistory.map(msg => ({
        role: msg.role,
        content: [{ text: msg.content }]
    }));
    messages.push({ role: 'user', content: [{ text: userQuestion }] });
    
    try {
      const response = await ai.generate({ 
        model: geminiFlash, 
        system: systemPrompt, 
        messages: messages,
      });
      const text = response.text();
      return text || (userLocale === 'es' ? 'Lo siento, no pude procesar esa pregunta.' : 'Sorry, I could not process that question.');
    } catch (e) {
      console.error('AI chat with book flow failed:', e);
       if (e instanceof Error && (e.message.includes('API key') || e.message.includes('authentication'))) {
        return userLocale === 'es' 
           ? 'Error de autenticación: La clave de API proporcionada no es válida, ha expirado o no tiene los permisos necesarios.' 
           : 'Authentication Error: The provided API key is invalid, expired, or does not have the required permissions.';
     }
      return userLocale === 'es' ? 'Hubo un error al procesar tu pregunta. Por favor, inténtalo de nuevo.' : 'There was an error processing your question. Please try again.';
    }
  }
);
