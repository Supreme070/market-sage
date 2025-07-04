// src/app/api/campaigns/route.ts

import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { authOptions } from "@/lib/auth";

const createCampaignSchema = z.object({
  subject: z.string().min(1),
  content: z.string().min(1),
  status: z.enum(["draft", "active", "paused"]),
});

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    // If not authenticated, return empty list
    return NextResponse.json([], { status: 200 });
  }
  const campaigns = await prisma.campaign.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(campaigns);
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const parsed = createCampaignSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid data", issues: parsed.error.errors },
      { status: 400 }
    );
  }

  const newCampaign = await prisma.campaign.create({
    data: {
      ...parsed.data,
      userId: session.user.id,
    },
  });
  return NextResponse.json(newCampaign, { status: 201 });
}
