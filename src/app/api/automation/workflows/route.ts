// src/app/api/automation/workflows/route.ts

import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { authOptions } from "@/lib/auth";

const createWorkflowSchema = z.object({
  name: z.string().min(1),
  definition: z.any(),
});

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json([], { status: 200 });
  }
  const flows = await prisma.workflow.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(flows);
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const parsed = createWorkflowSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid data", issues: parsed.error.errors },
      { status: 400 }
    );
  }

  const newFlow = await prisma.workflow.create({
    data: {
      name: parsed.data.name,
      definition: parsed.data.definition,
      userId: session.user.id,
    },
  });
  return NextResponse.json(newFlow, { status: 201 });
}
