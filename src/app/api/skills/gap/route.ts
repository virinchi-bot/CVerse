import { NextRequest, NextResponse } from 'next/server';
import { generateText } from '@/lib/openrouter';

export const maxDuration = 60;

export async function POST(req: NextRequest) {
  try {
    const { role, skills } = await req.json();

    const prompt = `
You are a brutally honest senior technical recruiter.
The user wants to become a: ${role}
Their current skills: ${skills}

Return ONLY valid JSON, no markdown:
{
  "matchScore": number 0-100,
  "summary": "2 sentence honest assessment",
  "missingSkills": ["skill1"],
  "roadmap": [
    {
      "skill": "skill name",
      "priority": "high" or "medium" or "low",
      "projectIdea": "one short project idea",
      "weeks": number
    }
  ],
  "timeline": "e.g. 3-4 months"
}
`;

    const text = await generateText(prompt);
    const clean = text.replace(/```json|```/g, '').trim();
    return NextResponse.json(JSON.parse(clean));
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}