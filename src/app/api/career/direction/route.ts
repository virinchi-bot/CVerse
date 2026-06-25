import { NextRequest, NextResponse } from 'next/server';
import { generateText } from '@/lib/openrouter';

export const maxDuration = 60;

export async function POST(req: NextRequest) {
  try {
    const { skills, projects, interests, workStyle } = await req.json();

    const prompt = `
You are a brutally honest CV advisor for developers and creators.

User profile:
Skills: ${skills}
Projects: ${projects}
Interests: ${interests}
Work style: ${workStyle}

Analyze this profile deeply and return ONLY valid JSON, no markdown:
{
  "topPath": "single best CV path name",
  "topPathReason": "2 sentences why this fits them best",
  "paths": [
    {
      "title": "path name",
      "match": number 0-100,
      "description": "2 sentence description",
      "requiredSkills": ["skill1"],
      "timeToReady": "e.g. 3 months",
      "incomeRange": "e.g. $40k-$80k"
    }
  ],
  "personalityInsights": "3-4 sentences about their working style and strengths",
  "realityCheck": "2-3 sentences of honest brutal feedback about where they stand",
  "nextActions": ["action1", "action2", "action3"]
}
Include 4-5 paths total. Be specific and honest, not generic.
`;

    const text = await generateText(prompt);
    const clean = text.replace(/```json|```/g, '').trim();
    return NextResponse.json(JSON.parse(clean));
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}