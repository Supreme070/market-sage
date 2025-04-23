import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';
import { authOptions } from '../../auth/[...nextauth]/route';

const workflowSchema = z.object({
  name: z.string().min(1),
  trigger: z.string().min(1),
  steps: z.any(),
  status: z.string().min(1),
});

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const workflow = await prisma.workflow.findFirst({ where: { id: params.id, userId: session.user.id } });
  if (!workflow) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json({ workflow });
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const existing = await prisma.workflow.findFirst({ where: { id: params.id, userId: session.user.id } });
  if (!existing) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  const body = await req.json();
  const parsed = workflowSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: 'Invalid data', issues: parsed.error.errors }, { status: 400 });
  const workflow = await prisma.workflow.update({
    where: { id: params.id },
    data: parsed.data,
  });
  return NextResponse.json({ workflow });
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const existing = await prisma.workflow.findFirst({ where: { id: params.id, userId: session.user.id } });
  if (!existing) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  await prisma.workflow.delete({ where: { id: params.id } });
  return NextResponse.json({ deleted: true });
}
