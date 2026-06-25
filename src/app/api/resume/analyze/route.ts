import { NextRequest, NextResponse } from 'next/server';
import pdf from 'pdf-parse';
import { generateText } from '@/lib/openrouter';

export const maxDuration = 60;

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('resume') as File;

    if (!file) return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    let resumeText = '';
    try {
      const pdfData = await pdf(buffer);
      resumeText = pdfData.text;
    } catch {
      return NextResponse.json({ error: 'Could not read PDF. Try a different file.' }, { status: 400 });
    }

    if (!resumeText.trim()) return NextResponse.json({ error: 'PDF has no readable text.' }, { status: 400 });

    const prompt = `
You are a brutally honest senior technical recruiter and CV advisor.
Analyze this resume and return ONLY a valid JSON object with no markdown, no backticks.

Resume:
${resumeText}

Return exactly this structure:
{
  "atsScore": number 0-100,
  "clarityScore": number 0-100,
  "impactScore": number 0-100,
  "recruiterScore": number 0-100,
  "skills": ["skill1"],
  "strengths": ["strength1"],
  "weaknesses": ["weakness1"],
  "suggestions": ["suggestion1"],
  "buzzwords": ["word1"],
  "developerLevel": "beginner" or "intermediate" or "advanced" or "ai-native"
}
Return ONLY raw JSON. No markdown. No explanation.
`;

    const text = await generateText(prompt);
    const clean = text.replace(/```json|```/g, '').trim();
    const data = JSON.parse(clean);

    return NextResponse.json(data);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}