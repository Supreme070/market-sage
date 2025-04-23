import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { authOptions } from '../auth/[...nextauth]/route';

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const workflows = await prisma.workflow.findMany({ where: { userId: session.user.id } });
  return NextResponse.json({ workflows });
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const body = await req.json();
  const workflow = await prisma.workflow.create({
    data: {
      userId: session.user.id,
      name: body.name,
      trigger: body.trigger,
      steps: body.steps,
      status: body.status ?? 'active',
    },
  });
  return NextResponse.json({ workflow });
}
