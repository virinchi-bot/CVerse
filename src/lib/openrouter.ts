export async function generateText(prompt: string): Promise<string> {
  const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': 'https://CVerse.vercel.app',
      'X-Title': 'CVerse',
    },
    body: JSON.stringify({
      model: 'openai/gpt-oss-120b:free',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 2048,
      temperature: 0.7,
    }),
  });

  const data = await res.json();
  
  console.log('OpenRouter response:', JSON.stringify(data));

  if (!data.choices || !data.choices[0]) {
    throw new Error(data.error?.message || 'No response from AI');
  }

  return data.choices[0].message.content;
}