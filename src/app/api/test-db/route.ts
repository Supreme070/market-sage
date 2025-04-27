// src/app/api/test-db/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    // Replace `user` with any model you have in your Prisma schema
    const count = await prisma.user.count();
    return NextResponse.json({ userCount: count });
  } catch (error) {
    console.error('DB test error:', error);
    return NextResponse.json({ error: 'Failed to query database' }, { status: 500 });
  }
}
