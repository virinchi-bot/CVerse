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

   const prompt = `You are a senior technical recruiter. Analyze this resume and return ONLY valid JSON.

Resume:
${resumeText.slice(0, 2000)}

Return this exact JSON:
{
  "atsScore": 0,
  "clarityScore": 0,
  "impactScore": 0,
  "recruiterScore": 0,
  "skills": [],
  "strengths": [],
  "weaknesses": [],
  "suggestions": [],
  "buzzwords": [],
  "developerLevel": "beginner"
}

Numbers 0-100. developerLevel: beginner/intermediate/advanced/ai-native. ONLY JSON.`;

    const text = await generateText(prompt);
    const clean = text.replace(/```json|```/g, '').trim();
    const data = JSON.parse(clean);

    return NextResponse.json(data);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
