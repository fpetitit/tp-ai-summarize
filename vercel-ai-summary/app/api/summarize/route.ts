
import { streamText } from 'ai';
import { google } from '@ai-sdk/google';  // ← remplace @ai-sdk/openai

export const runtime = 'edge';

export async function POST(req: Request) {
    const { prompt } = await req.json();

    // 🔒 Limite la taille du prompt à 5 000 caractères
    if (!prompt || typeof prompt !== 'string' || prompt.length > 5000) {
        return new Response(
            JSON.stringify({ error: 'Prompt invalide ou trop long (max 5 000 caractères).' }),
            { status: 400, headers: { 'Content-Type': 'application/json' } }
        );
    }

    const result = await streamText({
        model: google('gemini-3.1-flash-lite'),    // ← remplace openai('gpt-4o')
        messages: [
            {
                role: 'system',
                content: 'Tu es un assistant expert. Résume le texte suivant de manière concise sous forme de puces.',
            },
            { role: 'user', content: prompt },
        ],
    });

    return result.toUIMessageStreamResponse();
}