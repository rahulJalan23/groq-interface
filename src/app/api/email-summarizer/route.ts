import { createOpenAI, openai } from '@ai-sdk/openai';
import { generateText } from 'ai';

export async function POST(req: Request) {
  const { content, prompt, ...params } = await req.json();

  console.log({ params });
  const groq = createOpenAI({
    baseURL: 'https://api.groq.com/openai/v1',
    apiKey: process.env.NEXT_PRIVATE_GROQ_API_KEY,
  });

  const otherData = Object.keys(params).map(
    (key) => `${key}: \n ${params[key]} \n \n`
  );

  const finalPrompt = `${content}
  ${otherData.join('')}
`;

  console.log({ finalPrompt });

  const { text } = await generateText({
    model: groq('llama-3.1-70b-versatile'),
    system: prompt,
    prompt: finalPrompt,
    maxTokens: 1024,
  });
  return new Response(JSON.stringify({ text }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
