import { NextRequest, NextResponse } from 'next/server';
import { generateText } from '@/lib/openrouter';

export const maxDuration = 60;

export async function POST(req: NextRequest) {
  try {
    const { role, resume, answer, question, mode } = await req.json();

    if (mode === 'generate') {
      const prompt = `
You are a senior technical interviewer at a top tech company.
Role: ${role}
Resume: ${resume || 'Not provided'}

Generate 8 interview questions mixing technical, behavioral, and project types.
Return ONLY valid JSON, no markdown:
{
  "questions": [
    { "id": 1, "type": "technical", "question": "..." }
  ]
}
Types: "technical", "behavioral", "project"
`;
      const text = await generateText(prompt);
      const clean = text.replace(/```json|```/g, '').trim();
      return NextResponse.json(JSON.parse(clean));
    }

    if (mode === 'evaluate') {
      const prompt = `
You are a senior technical interviewer.
Question: ${question}
Candidate answer: ${answer}

Return ONLY valid JSON, no markdown:
{
  "score": number 0-10,
  "feedback": "2-3 sentences of honest feedback",
  "strongPoints": ["point1"],
  "improvements": ["improvement1"],
  "betterAnswer": "brief example of stronger answer"
}
`;
      const text = await generateText(prompt);
      const clean = text.replace(/```json|```/g, '').trim();
      return NextResponse.json(JSON.parse(clean));
    }

    return NextResponse.json({ error: 'Invalid mode' }, { status: 400 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}