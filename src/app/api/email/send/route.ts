import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { to, subject, html } = await req.json();
  // Simulate sending
  console.log(`[SIMULATED EMAIL SEND]→ To:`, to, 'Subject:', subject, '\n', html);
  // You could append to EmailLog via Prisma here
  return NextResponse.json({ success: true, message: 'Email sent (simulated)' });
}
