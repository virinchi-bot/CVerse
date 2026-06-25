import { NextRequest, NextResponse } from 'next/server';
import { generateText } from '@/lib/openrouter';

export const maxDuration = 60;

export async function POST(req: NextRequest) {
  try {
    const { type, input } = await req.json();

    const prompts: any = {
      linkedin_post: `
You are a personal branding expert. Write a modern authentic LinkedIn post about:
${input}
Rules: No corporate cringe. No "excited to announce". Sound like a real developer sharing their journey.
Keep it under 200 words. Use short paragraphs. End with 3 relevant hashtags.
Return ONLY the post text, nothing else.
`,
      github_bio: `
Write a short punchy GitHub bio (max 160 chars) for a developer based on:
${input}
Sound human, technical, and interesting. No buzzwords.
Return ONLY the bio text.
`,
      about_me: `
Write a portfolio "About Me" section for a developer based on:
${input}
Make it personal, honest, and technically credible. 3-4 short paragraphs.
Return ONLY the about me text.
`,
      elevator_pitch: `
Write a 30-second elevator pitch for a developer based on:
${input}
Should be confident, specific, and memorable. 4-5 sentences max.
Return ONLY the pitch text.
`,
      launch_post: `
Write a build-in-public project launch post for LinkedIn/Twitter based on:
${input}
Sound authentic, share what you learned, what problem it solves. Under 150 words.
Return ONLY the post text.
`,
    };

    const prompt = prompts[type];
    if (!prompt) return NextResponse.json({ error: 'Invalid type' }, { status: 400 });

    const text = await generateText(prompt);
    return NextResponse.json({ content: text.trim() });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}