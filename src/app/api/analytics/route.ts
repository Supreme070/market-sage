import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const campaigns = await prisma.campaign.findMany({
    where: { userId: session.user.id },
  });

  const stats = await Promise.all(
    campaigns.map(async (c) => {
      const opens = await prisma.emailLog.count({
        where: { campaignId: c.id, event: "opened" },
      });
      const clicks = await prisma.emailLog.count({
        where: { campaignId: c.id, event: "clicked" },
      });
      return { id: c.id, subject: c.subject, opens, clicks };
    })
  );

  return NextResponse.json({ analytics: stats });
}
