import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { authOptions } from '../auth/[...nextauth]/route';

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const campaigns = await prisma.campaign.findMany({ where: { userId: session.user.id } });
  return NextResponse.json({ campaigns });
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const body = await req.json();
  const campaign = await prisma.campaign.create({
    data: {
      userId: session.user.id,
      subject: body.subject,
      content: body.content,
      status: body.status ?? 'draft',
    },
  });
  return NextResponse.json({ campaign });
}
