// src/app/api/subscribers/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { authOptions } from "@/lib/auth";

// Schema for creating a subscriber
const createSubscriberSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1),
});

// Collection routes: GET list, POST create
export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json([], { status: 200 }); // unauthenticated => empty list
  }
  const subs = await prisma.subscriber.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(subs);
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const parsed = createSubscriberSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid data", issues: parsed.error.errors },
      { status: 400 }
    );
  }

  const newSub = await prisma.subscriber.create({
    data: { ...parsed.data, userId: session.user.id },
  });
  return NextResponse.json(newSub, { status: 201 });
}
