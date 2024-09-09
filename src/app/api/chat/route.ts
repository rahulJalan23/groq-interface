import { createOpenAI, openai } from '@ai-sdk/openai';
import { StreamingTextResponse, streamText } from 'ai';

export async function POST(req: Request) {
  const { messages } = await req.json();

  console.log('messages', messages);
  const groq = createOpenAI({
    baseURL: 'https://api.groq.com/openai/v1',
    apiKey: process.env.NEXT_PRIVATE_GROQ_API_KEY,
  });

  const result = await streamText({
    model: groq('llama-3.1-70b-versatile'),
    messages,
  });

  return new StreamingTextResponse(result.toAIStream());
}
