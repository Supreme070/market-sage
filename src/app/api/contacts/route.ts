import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { authOptions } from '../auth/[...nextauth]/route';

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const contacts = await prisma.contact.findMany({ where: { userId: session.user.id } });
  return NextResponse.json({ contacts });
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const body = await req.json();
  const contact = await prisma.contact.create({
    data: {
      userId: session.user.id,
      name: body.name,
      email: body.email,
      tags: body.tags ?? [],
    },
  });
  return NextResponse.json({ contact });
}
