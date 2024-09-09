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
    system: `You are a helpful assistant. Create a SMS summary based on the above data.
Make sure that the summary is short. Not more than 400 characters.
The email is send by the school to the parents of the students studying at the school.
The aim is to take the above email data and create a brief actionable and informative SMS for the busy parents.

EXAMPLE RESPONSE:
- Picnic on Saturday, 10/23/24.
- Make sure to pack extra lunch and evening snacks.
- You my pack a Mat, Toys and other games as well.

Return only the summary and nothing else.`,
    prompt: content,
    maxTokens: 1024,
  });
  return new Response(JSON.stringify({ text }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
