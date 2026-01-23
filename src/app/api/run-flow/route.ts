
import { NextRequest, NextResponse } from 'next/server';
import { run } from '@genkit-ai/flow';
import { predictiveEngagementFlow } from '@/ai/flows/predictive-engagement';

export async function POST(req: NextRequest) {
  try {
    const { history, userName } = await req.json();

    if (!history || !userName) {
      return NextResponse.json({ error: 'Missing history or userName' }, { status: 400 });
    }

    const result = await run(predictiveEngagementFlow, { history, userName });

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error running flow:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
