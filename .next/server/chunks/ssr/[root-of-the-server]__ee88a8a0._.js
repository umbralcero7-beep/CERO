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
"[project]/src/ai/flows/suggest-habits.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

/* __next_internal_action_entry_do_not_use__ [{"40562682cfe5c1eb8206ff855a5568fb6e8762fa64":"suggestHabits"},"",""] */ __turbopack_context__.s([
    "suggestHabits",
    ()=>suggestHabits
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
/**
 * @fileOverview Sugiere hábitos personalizados basados en las respuestas de un cuestionario de onboarding.
 *
 * - suggestHabits: Función que toma las respuestas y devuelve sugerencias de hábitos.
 * - OnboardingInput: El tipo de entrada para la función.
 * - SuggestedHabit: El tipo para un único hábito sugerido.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ai$2f$genkit$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/ai/genkit.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$genkit__$5b$external$5d$__$28$genkit$2c$__esm_import$29$__ = __turbopack_context__.i("[externals]/genkit [external] (genkit, esm_import)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ai$2f$genkit$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$externals$5d2f$genkit__$5b$external$5d$__$28$genkit$2c$__esm_import$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ai$2f$genkit$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$externals$5d2f$genkit__$5b$external$5d$__$28$genkit$2c$__esm_import$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
const OnboardingInputSchema = __TURBOPACK__imported__module__$5b$externals$5d2f$genkit__$5b$external$5d$__$28$genkit$2c$__esm_import$29$__["z"].object({
    goal: __TURBOPACK__imported__module__$5b$externals$5d2f$genkit__$5b$external$5d$__$28$genkit$2c$__esm_import$29$__["z"].string().describe('El principal objetivo que el usuario quiere alcanzar.'),
    challenge: __TURBOPACK__imported__module__$5b$externals$5d2f$genkit__$5b$external$5d$__$28$genkit$2c$__esm_import$29$__["z"].string().describe('El mayor desafío o preocupación actual del usuario.')
});
const SuggestedHabitSchema = __TURBOPACK__imported__module__$5b$externals$5d2f$genkit__$5b$external$5d$__$28$genkit$2c$__esm_import$29$__["z"].object({
    name: __TURBOPACK__imported__module__$5b$externals$5d2f$genkit__$5b$external$5d$__$28$genkit$2c$__esm_import$29$__["z"].string().describe('El nombre del hábito, corto y motivador. (Ej: "Meditación de 5 minutos")'),
    description: __TURBOPACK__imported__module__$5b$externals$5d2f$genkit__$5b$external$5d$__$28$genkit$2c$__esm_import$29$__["z"].string().describe('Una descripción breve y clara de cómo realizar el hábito.')
});
const HabitSuggestionOutputSchema = __TURBOPACK__imported__module__$5b$externals$5d2f$genkit__$5b$external$5d$__$28$genkit$2c$__esm_import$29$__["z"].array(SuggestedHabitSchema);
async function suggestHabits(input) {
    return suggestHabitsFlow(input);
}
const prompt = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ai$2f$genkit$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ai"].definePrompt({
    name: 'suggestHabitsPrompt',
    model: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ai$2f$genkit$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["geminiFlash"],
    input: {
        schema: OnboardingInputSchema
    },
    output: {
        schema: HabitSuggestionOutputSchema
    },
    prompt: `Eres Cero, un asistente de IA experto en bienestar.\nTu tarea es analizar las respuestas de un nuevo usuario y sugerir 3 hábitos simples, concretos y accionables para empezar.\n\nContexto del usuario:\n- Objetivo principal: {{{goal}}}\n- Mayor desafío actual: {{{challenge}}}\n\nBasado en esto, genera una lista de 3 hábitos. Cada hábito debe ser:\n- Sencillo de empezar (ej. "5 minutos de...", "Escribir 3 cosas...").\n- Directamente relacionado con su objetivo y desafío.\n- Tener un nombre motivador y una descripción clara.\n\nNo añadas introducciones ni texto adicional. Devuelve solo el array de objetos de hábitos.`
});
const suggestHabitsFlow = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ai$2f$genkit$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ai"].defineFlow({
    name: 'suggestHabitsFlow',
    inputSchema: OnboardingInputSchema,
    outputSchema: HabitSuggestionOutputSchema
}, async (input)=>{
    if (!process.env.GEMINI_API_KEY) {
        console.error('GEMINI_API_KEY environment variable not set.');
        return [
            {
                name: 'Error de Configuración',
                description: 'La clave de API de IA no está definida. Añádela a tu archivo .env.'
            }
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
                    description: 'La clave de API para la IA no es válida o ha expirado.'
                }
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
});
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    suggestHabits
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(suggestHabits, "40562682cfe5c1eb8206ff855a5568fb6e8762fa64", null);
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/.next-internal/server/app/onboarding/page/actions.js { ACTIONS_MODULE0 => \"[project]/src/ai/flows/suggest-habits.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ai$2f$flows$2f$suggest$2d$habits$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/ai/flows/suggest-habits.ts [app-rsc] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ai$2f$flows$2f$suggest$2d$habits$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ai$2f$flows$2f$suggest$2d$habits$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/.next-internal/server/app/onboarding/page/actions.js { ACTIONS_MODULE0 => \"[project]/src/ai/flows/suggest-habits.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "40562682cfe5c1eb8206ff855a5568fb6e8762fa64",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ai$2f$flows$2f$suggest$2d$habits$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["suggestHabits"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f$onboarding$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$src$2f$ai$2f$flows$2f$suggest$2d$habits$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i('[project]/.next-internal/server/app/onboarding/page/actions.js { ACTIONS_MODULE0 => "[project]/src/ai/flows/suggest-habits.ts [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <locals>');
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ai$2f$flows$2f$suggest$2d$habits$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/ai/flows/suggest-habits.ts [app-rsc] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f$onboarding$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$src$2f$ai$2f$flows$2f$suggest$2d$habits$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$locals$3e$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ai$2f$flows$2f$suggest$2d$habits$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f$onboarding$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$src$2f$ai$2f$flows$2f$suggest$2d$habits$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$locals$3e$__, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ai$2f$flows$2f$suggest$2d$habits$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/src/app/favicon.ico.mjs { IMAGE => \"[project]/src/app/favicon.ico (static in ecmascript)\" } [app-rsc] (structured image object, ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/src/app/favicon.ico.mjs { IMAGE => \"[project]/src/app/favicon.ico (static in ecmascript)\" } [app-rsc] (structured image object, ecmascript)"));
}),
"[project]/src/app/layout.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/src/app/layout.tsx [app-rsc] (ecmascript)"));
}),
"[project]/src/app/onboarding/page.tsx [app-rsc] (client reference proxy) <module evaluation>", ((__turbopack_context__) => {
"use strict";

// This file is generated by next-core EcmascriptClientReferenceModule.
__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/src/app/onboarding/page.tsx <module evaluation> from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/app/onboarding/page.tsx <module evaluation>", "default");
}),
"[project]/src/app/onboarding/page.tsx [app-rsc] (client reference proxy)", ((__turbopack_context__) => {
"use strict";

// This file is generated by next-core EcmascriptClientReferenceModule.
__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/src/app/onboarding/page.tsx from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/app/onboarding/page.tsx", "default");
}),
"[project]/src/app/onboarding/page.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$onboarding$2f$page$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/src/app/onboarding/page.tsx [app-rsc] (client reference proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$onboarding$2f$page$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__ = __turbopack_context__.i("[project]/src/app/onboarding/page.tsx [app-rsc] (client reference proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$onboarding$2f$page$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__);
}),
"[project]/src/app/onboarding/page.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/src/app/onboarding/page.tsx [app-rsc] (ecmascript)"));
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__ee88a8a0._.js.map