import { NextRequest, NextResponse } from 'next/server';
import { generateText } from '@/lib/openrouter';

export const maxDuration = 60;

export async function POST(req: NextRequest) {
  try {
    const { name, role, skills, projects, experience, tone } = await req.json();

    const prompt = `
You are a personal branding expert for developers.

Generate a complete portfolio content package for:
Name: ${name}
Role: ${role}
Skills: ${skills}
Projects: ${projects}
Experience: ${experience}
Tone: ${tone}

Return ONLY valid JSON, no markdown:
{
  "tagline": "short punchy one-liner under 10 words",
  "about": "3 paragraph about section, personal and technical",
  "skills": ["skill1", "skill2"],
  "projects": [
    {
      "name": "project name",
      "description": "2-3 sentence recruiter-friendly description",
      "bullets": ["bullet1", "bullet2", "bullet3"],
      "tags": ["tag1", "tag2"]
    }
  ],
  "experience": "2-3 paragraph experience summary",
  "cta": "call to action line for portfolio contact section"
}
`;

    const text = await generateText(prompt);
    const clean = text.replace(/```json|```/g, '').trim();
    return NextResponse.json(JSON.parse(clean));
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}