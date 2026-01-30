module.exports = [
"[externals]/genkit [external] (genkit, esm_import)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

const mod = await __turbopack_context__.y("genkit");

__turbopack_context__.n(mod);
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, true);}),
"[externals]/@genkit-ai/googleai [external] (@genkit-ai/googleai, esm_import)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

const mod = await __turbopack_context__.y("@genkit-ai/googleai");

__turbopack_context__.n(mod);
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, true);}),
"[project]/src/ai/genkit.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "ai",
    ()=>ai,
    "geminiFlash",
    ()=>geminiFlash
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$genkit__$5b$external$5d$__$28$genkit$2c$__esm_import$29$__ = __turbopack_context__.i("[externals]/genkit [external] (genkit, esm_import)");
var __TURBOPACK__imported__module__$5b$externals$5d2f40$genkit$2d$ai$2f$googleai__$5b$external$5d$__$2840$genkit$2d$ai$2f$googleai$2c$__esm_import$29$__ = __turbopack_context__.i("[externals]/@genkit-ai/googleai [external] (@genkit-ai/googleai, esm_import)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f$genkit__$5b$external$5d$__$28$genkit$2c$__esm_import$29$__,
    __TURBOPACK__imported__module__$5b$externals$5d2f40$genkit$2d$ai$2f$googleai__$5b$external$5d$__$2840$genkit$2d$ai$2f$googleai$2c$__esm_import$29$__
]);
[__TURBOPACK__imported__module__$5b$externals$5d2f$genkit__$5b$external$5d$__$28$genkit$2c$__esm_import$29$__, __TURBOPACK__imported__module__$5b$externals$5d2f40$genkit$2d$ai$2f$googleai__$5b$external$5d$__$2840$genkit$2d$ai$2f$googleai$2c$__esm_import$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
const ai = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$genkit__$5b$external$5d$__$28$genkit$2c$__esm_import$29$__["genkit"])({
    plugins: [
        (0, __TURBOPACK__imported__module__$5b$externals$5d2f40$genkit$2d$ai$2f$googleai__$5b$external$5d$__$2840$genkit$2d$ai$2f$googleai$2c$__esm_import$29$__["googleAI"])()
    ]
});
const geminiFlash = __TURBOPACK__imported__module__$5b$externals$5d2f40$genkit$2d$ai$2f$googleai__$5b$external$5d$__$2840$genkit$2d$ai$2f$googleai$2c$__esm_import$29$__["gemini15Flash"];
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/src/lib/data.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// src/lib/data.ts
__turbopack_context__.s([
    "achievements",
    ()=>achievements,
    "habitProgress",
    ()=>habitProgress,
    "habits",
    ()=>habits,
    "libraryItems",
    ()=>libraryItems,
    "moodHistory",
    ()=>moodHistory
]);
const habits = [
    {
        id: '1',
        title: 'Meditación Matutina',
        description: '5 minutos de meditación mindfulness.',
        active: true
    },
    {
        id: '2',
        title: 'Escribir Diario',
        description: 'Escribir una página sobre tus pensamientos.',
        active: true
    },
    {
        id: '3',
        title: 'Caminata de 15 min',
        description: 'Un paseo corto para despejar la mente.',
        active: false
    },
    {
        id: '4',
        title: 'Leer un capítulo',
        description: 'Avanzar en tu libro actual.',
        active: true
    },
    {
        id: '5',
        title: 'Beber 2L de agua',
        description: 'Mantenerse hidratado durante el día.',
        active: true
    }
];
const libraryItems = [
    {
        id: 'lib4',
        title: 'Cómo hacer que te pasen cosas buenas',
        author: 'Marian Rojas Estapé',
        category: 'Energía',
        type: 'Texto',
        imageId: 'library_4',
        pdfUrl: 'https://drive.google.com/file/d/1u_ADqyD7qX5dT_RnXikoEQ5CZmLzVURz/preview'
    },
    {
        id: 'lib3',
        title: 'Deja de ser tú',
        author: 'Joe Dispenza',
        category: 'Reflexión',
        type: 'Texto',
        imageId: 'library_3',
        pdfUrl: 'https://drive.google.com/file/d/1NozvPxM_yUNXOPhAId8VQfMkUgaTPbk-/preview',
        isPremium: true
    },
    {
        id: 'lib1',
        title: 'El sutil arte de que (no) te importe nada',
        author: 'Mark Manson',
        category: 'Reflexión',
        type: 'Texto',
        imageId: 'library_1',
        pdfUrl: 'https://drive.google.com/file/d/11xYHzM3Mwo2H5d0a4dqjFlvDWWlLMRHg/preview'
    },
    {
        id: 'lib2',
        title: 'El poder del ahora',
        author: 'Eckhart Tolle',
        category: 'Calma',
        type: 'Texto',
        imageId: 'library_2',
        pdfUrl: 'https://drive.google.com/file/d/14YWSX216mVu_mbOmnvpEQ3s4lA2MmKM6/preview'
    },
    {
        id: 'lib14',
        title: 'Hábitos Atómicos',
        author: 'James Clear',
        category: 'Energía',
        type: 'Texto',
        imageId: 'library_14',
        pdfUrl: 'https://drive.google.com/file/d/1ZCbG-a_-AyQMcNG3uHkaMaMQdhGtrG5b/preview'
    },
    {
        id: 'lib5',
        title: 'Inteligencia Emocional',
        author: 'Daniel Goleman',
        category: 'Reflexión',
        type: 'Texto',
        imageId: 'library_5',
        pdfUrl: 'https://drive.google.com/file/d/1KSbPIY568mkmyk38KnqSTKS75h5RSy0l/preview',
        isPremium: true
    },
    {
        id: 'lib6',
        title: 'Las 48 leyes del poder',
        author: 'Robert Greene',
        category: 'Reflexión',
        type: 'Texto',
        imageId: 'library_6',
        pdfUrl: 'https://drive.google.com/file/d/1kJAkcNGzcYFefCyOXH0IgnHkxH7RUjER/preview',
        isPremium: true
    },
    {
        id: 'lib7',
        title: 'Los secretos de la mente millonaria',
        author: 'T. Harv Eker',
        category: 'Energía',
        type: 'Texto',
        imageId: 'library_7',
        pdfUrl: 'https://drive.google.com/file/d/1JL09dxA0GwFYeUpw91VXjM31L3_u_uLo/preview'
    },
    {
        id: 'lib10',
        title: 'Mañanas milagrosas',
        author: 'Hal Elrod',
        category: 'Energía',
        type: 'Texto',
        imageId: 'library_10',
        pdfUrl: 'https://drive.google.com/file/d/1vDq4LzEUa1qUY7dxepUSU9Huf2ge2MmB/preview'
    },
    {
        id: 'lib12',
        title: 'Meditaciones',
        author: 'Marco Aurelio',
        category: 'Calma',
        type: 'Texto',
        imageId: 'library_12',
        pdfUrl: 'https://drive.google.com/file/d/1aS7ju3ScIwiZWfKW_JqfJ3Cn2bOljfeF/preview'
    },
    {
        id: 'lib8',
        title: 'Padre rico, padre pobre',
        author: 'Robert T. Kiyosaki',
        category: 'Energía',
        type: 'Texto',
        imageId: 'library_8',
        pdfUrl: 'https://drive.google.com/file/d/1fGfhKFV3_3BkLH746Bh493_wgzKIR1zU/preview'
    },
    {
        id: 'lib13',
        title: 'Poder sin límites',
        author: 'Tony Robbins',
        category: 'Energía',
        type: 'Texto',
        imageId: 'library_13',
        pdfUrl: 'https://drive.google.com/file/d/1CYLcYq7yvCnA5zpBBQEKXO7RwBKIczV6/preview',
        isPremium: true
    },
    {
        id: 'lib9',
        title: 'Psicología oscura',
        author: 'Steven Turner',
        category: 'Reflexión',
        type: 'Texto',
        imageId: 'library_9',
        pdfUrl: 'https://drive.google.com/file/d/1w_kZci4WBG0y714ljlzTDwkAaq2dxaSv/preview'
    },
    {
        id: 'lib11',
        title: 'Tus zonas erróneas',
        author: 'Wayne Dyer',
        category: 'Reflexión',
        type: 'Texto',
        imageId: 'library_11',
        pdfUrl: 'https://drive.google.com/file/d/1ljBxvzJCXNlhJmQMoRXdWQbmmqOquasv/preview'
    }
];
const moodHistory = [
    {
        date: '2024-07-01',
        mood: 'Feliz',
        value: 5
    },
    {
        date: '2024-07-02',
        mood: 'Pensativo',
        value: 3
    },
    {
        date: '2024-07-03',
        mood: 'Feliz',
        value: 5
    },
    {
        date: '2024-07-04',
        mood: 'Cansado',
        value: 2
    },
    {
        date: '2024-07-05',
        mood: 'Estresado',
        value: 1
    },
    {
        date: '2024-07-06',
        mood: 'Calmado',
        value: 4
    },
    {
        date: '2024-07-07',
        mood: 'Feliz',
        value: 5
    }
];
const habitProgress = [
    {
        name: 'Semana 1',
        'Meditación': 80,
        'Lectura': 90,
        'Ejercicio': 60
    },
    {
        name: 'Semana 2',
        'Meditación': 70,
        'Lectura': 85,
        'Ejercicio': 75
    },
    {
        name: 'Semana 3',
        'Meditación': 90,
        'Lectura': 95,
        'Ejercicio': 80
    },
    {
        name: 'Semana 4',
        'Meditación': 85,
        'Lectura': 92,
        'Ejercicio': 88
    }
];
const achievements = [
    {
        id: 'achievements.mood_1',
        title: 'Primer Paso',
        description: 'Registraste tu primer estado de ánimo.',
        icon: 'Smile'
    },
    {
        id: 'achievements.mood_10',
        title: 'Explorador Emocional',
        description: 'Registraste 10 estados de ánimo.',
        icon: 'Compass'
    },
    {
        id: 'achievements.mood_25',
        title: 'Viajero Consciente',
        description: 'Registraste 25 estados de ánimo.',
        icon: 'Map'
    },
    {
        id: 'achievements.mood_50',
        title: 'Guardián del Umbral',
        description: 'Registraste 50 estados de ánimo.',
        icon: 'Key'
    },
    {
        id: 'achievements.mood_100',
        title: 'Maestro del Ser',
        description: 'Has alcanzado el nivel de Maestro del Ser.',
        icon: 'Star'
    },
    {
        id: 'achievements.habit_1',
        title: 'Nuevo Hábito',
        description: 'Creaste tu primer hábito.',
        icon: 'PlusCircle'
    },
    {
        id: 'achievements.habit_log_1',
        title: '¡En Camino!',
        description: 'Completaste un hábito por primera vez.',
        icon: 'CheckCircle'
    },
    {
        id: 'achievements.habit_log_10',
        title: 'Constancia',
        description: 'Completaste hábitos 10 veces.',
        icon: 'Award'
    }
];
}),
"[project]/src/ai/flows/personalized-recommendations.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

/* __next_internal_action_entry_do_not_use__ [{"400c1a5fcd631d3de455759932f98069c54bdc27a2":"getPersonalizedRecommendations"},"",""] */ __turbopack_context__.s([
    "getPersonalizedRecommendations",
    ()=>getPersonalizedRecommendations
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
/**
 * @fileOverview Provides personalized recommendations for habits and readings based on the user's mood.
 *
 * - getPersonalizedRecommendations - A function that takes mood and journal text and returns recommendations.
 * - PersonalizedRecommendationsInput - The input type for the getPersonalizedRecommendations function.
 * - PersonalizedRecommendationsOutput - The return type for the getPersonalizedRecommendations function.
 */ // Import geminiFlash from the central config file
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ai$2f$genkit$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/ai/genkit.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$genkit__$5b$external$5d$__$28$genkit$2c$__esm_import$29$__ = __turbopack_context__.i("[externals]/genkit [external] (genkit, esm_import)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/data.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ai$2f$genkit$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$externals$5d2f$genkit__$5b$external$5d$__$28$genkit$2c$__esm_import$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ai$2f$genkit$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$externals$5d2f$genkit__$5b$external$5d$__$28$genkit$2c$__esm_import$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
const bookSchema = __TURBOPACK__imported__module__$5b$externals$5d2f$genkit__$5b$external$5d$__$28$genkit$2c$__esm_import$29$__["z"].object({
    title: __TURBOPACK__imported__module__$5b$externals$5d2f$genkit__$5b$external$5d$__$28$genkit$2c$__esm_import$29$__["z"].string(),
    author: __TURBOPACK__imported__module__$5b$externals$5d2f$genkit__$5b$external$5d$__$28$genkit$2c$__esm_import$29$__["z"].string()
});
// Simplified Input Schema (no voiceAnalysis)
const PersonalizedRecommendationsInputSchema = __TURBOPACK__imported__module__$5b$externals$5d2f$genkit__$5b$external$5d$__$28$genkit$2c$__esm_import$29$__["z"].object({
    mood: __TURBOPACK__imported__module__$5b$externals$5d2f$genkit__$5b$external$5d$__$28$genkit$2c$__esm_import$29$__["z"].string().describe('The current mood of the user.'),
    journalText: __TURBOPACK__imported__module__$5b$externals$5d2f$genkit__$5b$external$5d$__$28$genkit$2c$__esm_import$29$__["z"].string().optional().describe("The user's journal entry, if provided."),
    books: __TURBOPACK__imported__module__$5b$externals$5d2f$genkit__$5b$external$5d$__$28$genkit$2c$__esm_import$29$__["z"].array(bookSchema).describe('A list of available books in the library.')
});
const PersonalizedRecommendationsOutputSchema = __TURBOPACK__imported__module__$5b$externals$5d2f$genkit__$5b$external$5d$__$28$genkit$2c$__esm_import$29$__["z"].object({
    inspirationalPhrase: __TURBOPACK__imported__module__$5b$externals$5d2f$genkit__$5b$external$5d$__$28$genkit$2c$__esm_import$29$__["z"].string().describe('Una frase empática y motivadora corta (1-2 líneas) basada en el estado de ánimo y el diario del usuario.'),
    habitRecommendation: __TURBOPACK__imported__module__$5b$externals$5d2f$genkit__$5b$external$5d$__$28$genkit$2c$__esm_import$29$__["z"].string().describe('Un hábito simple y accionable basado en la situación del usuario.'),
    readingRecommendation: __TURBOPACK__imported__module__$5b$externals$5d2f$genkit__$5b$external$5d$__$28$genkit$2c$__esm_import$29$__["z"].string().describe('Un libro de la biblioteca que sea relevante para la situación actual del usuario. Formato: "Título por Autor".'),
    symbolicPhrase: __TURBOPACK__imported__module__$5b$externals$5d2f$genkit__$5b$external$5d$__$28$genkit$2c$__esm_import$29$__["z"].string().describe('Una frase corta, poética y simbólica que actúe como un "eco" empático de los pensamientos del usuario. Ejemplo: "Incluso en la quietud, tu luz sigue brillando.')
});
async function getPersonalizedRecommendations(input) {
    const books = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["libraryItems"].map(({ title, author })=>({
            title,
            author
        }));
    return personalizedRecommendationsFlow({
        ...input,
        books
    });
}
// Simplified Prompt (no voice analysis)
const prompt = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ai$2f$genkit$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ai"].definePrompt({
    name: 'personalizedRecommendationsPrompt',
    // Explicitly set the model to the one defined in genkit.ts
    model: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ai$2f$genkit$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["geminiFlash"],
    input: {
        schema: PersonalizedRecommendationsInputSchema
    },
    output: {
        schema: PersonalizedRecommendationsOutputSchema
    },
    prompt: `Eres Cero, un asistente de IA excepcionalmente empático y experto en bienestar. Tu objetivo es proporcionar apoyo profundo y personalizado.

Un usuario ha compartido cómo se siente.
- Estado de ánimo: {{{mood}}}
{{#if journalText}}
- Pensamientos: {{{journalText}}}
{{/if}}

Tu tarea es responder con un único objeto JSON que se adhiera al siguiente esquema. No añadas texto ni explicaciones fuera del objeto JSON.
\`\`\`json
{
  "inspirationalPhrase": "Una frase empática y motivadora corta (1-2 líneas) basada en el estado de ánimo y el diario del usuario.",
  "habitRecommendation": "Un hábito simple y accionable basado en la situación del usuario.",
  "readingRecommendation": "Un libro de la biblioteca que sea relevante para la situación actual del usuario. Formato: 'Título por Autor'.",
  "symbolicPhrase": "Una frase corta, poética y simbólica que actúe como un 'eco' empático de los pensamientos del usuario. Debe ser como un espejo, reflejando el tono y el sentimiento de su entrada en el diario. Por ejemplo, si el usuario se siente 'cansado pero esperanzado', una buena frase sería: 'Incluso en la quietud, tu luz sigue brillando.'"
}
\`\`\`

Analiza profundamente el estado de ánimo y los pensamientos del usuario para generar los valores para cada campo.
Para 'readingRecommendation', elige el libro más relevante de la siguiente lista. Varía tus sugerencias.

Libros disponibles:
{{#each books}}
- {{{this.title}}} por {{{this.author}}}
{{/each}}`
});
const personalizedRecommendationsFlow = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ai$2f$genkit$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ai"].defineFlow({
    name: 'personalizedRecommendationsFlow',
    inputSchema: PersonalizedRecommendationsInputSchema,
    outputSchema: PersonalizedRecommendationsOutputSchema
}, async (input)=>{
    if (!process.env.GEMINI_API_KEY) {
        console.error('GEMINI_API_KEY environment variable not set.');
        return {
            inspirationalPhrase: 'Error de Configuración: La clave de API para el servicio de IA no está definida.',
            habitRecommendation: 'Añade tu clave en un archivo .env para recibir sugerencias.',
            readingRecommendation: 'Inténtalo de nuevo después de configurar la clave.',
            symbolicPhrase: 'La conexión con tu guía interior está esperando.'
        };
    }
    try {
        const { output } = await prompt(input);
        return output;
    } catch (e) {
        console.error('AI recommendation flow failed, providing fallback:', e);
        if (e instanceof Error && (e.message.includes('API key') || e.message.includes('authentication'))) {
            return {
                inspirationalPhrase: 'Error de autenticación con la IA.',
                habitRecommendation: 'La clave de API podría no ser válida.',
                readingRecommendation: 'Por favor, verifica tu configuración.',
                symbolicPhrase: 'Parece que hay una interferencia en la señal.'
            };
        }
        // Return a default recommendation that is more random
        const fallbackBook = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["libraryItems"][Math.floor(Math.random() * __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["libraryItems"].length)] || {
            title: 'un libro',
            author: 'un autor'
        };
        return {
            inspirationalPhrase: 'Recuerda ser amable contigo mismo. Cada día es una nueva oportunidad.',
            habitRecommendation: 'Dedica 5 minutos a la lectura consciente.',
            readingRecommendation: `${fallbackBook.title} por ${fallbackBook.author}`,
            symbolicPhrase: 'Cada momento es un nuevo comienzo.'
        };
    }
});
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    getPersonalizedRecommendations
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getPersonalizedRecommendations, "400c1a5fcd631d3de455759932f98069c54bdc27a2", null);
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/.next-internal/server/app/(main)/page/actions.js { ACTIONS_MODULE0 => \"[project]/src/ai/flows/personalized-recommendations.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ai$2f$flows$2f$personalized$2d$recommendations$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/ai/flows/personalized-recommendations.ts [app-rsc] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ai$2f$flows$2f$personalized$2d$recommendations$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ai$2f$flows$2f$personalized$2d$recommendations$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/.next-internal/server/app/(main)/page/actions.js { ACTIONS_MODULE0 => \"[project]/src/ai/flows/personalized-recommendations.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "400c1a5fcd631d3de455759932f98069c54bdc27a2",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ai$2f$flows$2f$personalized$2d$recommendations$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getPersonalizedRecommendations"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f28$main$292f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$src$2f$ai$2f$flows$2f$personalized$2d$recommendations$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i('[project]/.next-internal/server/app/(main)/page/actions.js { ACTIONS_MODULE0 => "[project]/src/ai/flows/personalized-recommendations.ts [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <locals>');
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ai$2f$flows$2f$personalized$2d$recommendations$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/ai/flows/personalized-recommendations.ts [app-rsc] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f28$main$292f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$src$2f$ai$2f$flows$2f$personalized$2d$recommendations$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$locals$3e$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ai$2f$flows$2f$personalized$2d$recommendations$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f28$main$292f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$src$2f$ai$2f$flows$2f$personalized$2d$recommendations$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$locals$3e$__, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ai$2f$flows$2f$personalized$2d$recommendations$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/src/app/favicon.ico.mjs { IMAGE => \"[project]/src/app/favicon.ico (static in ecmascript)\" } [app-rsc] (structured image object, ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/src/app/favicon.ico.mjs { IMAGE => \"[project]/src/app/favicon.ico (static in ecmascript)\" } [app-rsc] (structured image object, ecmascript)"));
}),
"[project]/src/app/layout.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/src/app/layout.tsx [app-rsc] (ecmascript)"));
}),
"[project]/src/app/(main)/layout.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/src/app/(main)/layout.tsx [app-rsc] (ecmascript)"));
}),
"[project]/src/app/(main)/page.tsx [app-rsc] (client reference proxy) <module evaluation>", ((__turbopack_context__) => {
"use strict";

// This file is generated by next-core EcmascriptClientReferenceModule.
__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/src/app/(main)/page.tsx <module evaluation> from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/app/(main)/page.tsx <module evaluation>", "default");
}),
"[project]/src/app/(main)/page.tsx [app-rsc] (client reference proxy)", ((__turbopack_context__) => {
"use strict";

// This file is generated by next-core EcmascriptClientReferenceModule.
__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/src/app/(main)/page.tsx from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/app/(main)/page.tsx", "default");
}),
"[project]/src/app/(main)/page.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$main$292f$page$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/src/app/(main)/page.tsx [app-rsc] (client reference proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$main$292f$page$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__ = __turbopack_context__.i("[project]/src/app/(main)/page.tsx [app-rsc] (client reference proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$main$292f$page$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__);
}),
"[project]/src/app/(main)/page.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/src/app/(main)/page.tsx [app-rsc] (ecmascript)"));
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__20b46c80._.js.map