// src/lib/openrouter.ts

const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions';

// openrouter/free auto-selects a working free model — best first try
// Rest are known-good confirmed slugs as of July 2026, in priority order
const FALLBACK_MODELS = [
  'openrouter/free',
  'openai/gpt-oss-120b:free',
  'meta-llama/llama-3.3-70b-instruct:free',
  'nvidia/nemotron-3-ultra:free',
];

interface GenerateOptions {
  temperature?: number;
  maxTokens?: number;
}

async function callModel(
  model: string,
  prompt: string,
  options: GenerateOptions
): Promise<string> {
  const res = await fetch(OPENROUTER_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
      'X-Title': 'CVerse',
    },
    body: JSON.stringify({
      model,
      messages: [{ role: 'user', content: prompt }],
      temperature: options.temperature ?? 0.7,
      max_tokens: options.maxTokens ?? 2000,
    }),
  });

  if (!res.ok) {
    const errBody = await res.text();
    throw new Error(`HTTP ${res.status}: ${errBody}`);
  }

  const data = await res.json();

  if (data.error) {
    throw new Error(data.error.message || 'Provider returned error');
  }

  const content = data.choices?.[0]?.message?.content;
  if (!content) {
    throw new Error('Empty response from model');
  }

  return content;
}

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function generateText(
  prompt: string,
  options: GenerateOptions = {}
): Promise<string> {
  const errors: string[] = [];

  for (const model of FALLBACK_MODELS) {
    // retry each model once after a short delay if it's a 429
    for (let attempt = 0; attempt < 2; attempt++) {
      try {
        return await callModel(model, prompt, options);
      } catch (err: any) {
        const msg = err.message || '';
        errors.push(`${model}: ${msg}`);

        if (msg.includes('429') && attempt === 0) {
          await sleep(3000); // brief wait, then retry same model once
          continue;
        }
        break; // move to next model
      }
    }
  }

  console.error('[openrouter] All models failed:', errors.join(' | '));
  throw new Error('All AI providers are currently unavailable. Please try again in a moment.');
}