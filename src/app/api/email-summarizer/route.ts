import { createOpenAI, openai } from '@ai-sdk/openai';
import { generateText } from 'ai';

export async function POST(req: Request) {
  const { content } = await req.json();

  const groq = createOpenAI({
    baseURL: 'https://api.groq.com/openai/v1',
    apiKey: process.env.NEXT_PRIVATE_GROQ_API_KEY,
  });

  const { text } = await generateText({
    model: groq('llama-3.1-70b-versatile'),
    system: 'You are an email summarizer.',
    prompt: content,
  });
  return new Response(JSON.stringify({ text }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
