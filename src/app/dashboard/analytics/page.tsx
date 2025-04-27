// src/app/dashboard/analytics/page.tsx
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import AnalyticsChart, { CampaignStat } from "./AnalyticsChart";

export default async function AnalyticsPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    redirect("/login");
  }

  // Fetch analytics data on the server
  const campaigns = await prisma.campaign.findMany({
    where: { userId: session.user.id },
  });

  const data: CampaignStat[] = await Promise.all(
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

  if (data.length === 0) {
    return (
      <div className="p-6 text-center text-muted-foreground">
        No analytics data available.
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-bold">Analytics</h1>
        <p className="text-muted-foreground mt-1">
          A summary of email opens and clicks by campaign.
        </p>
      </div>

      {/* Client-side chart */}
      <AnalyticsChart data={data} />

      {/* Server-rendered table fallback */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-background border">
          <thead>
            <tr className="bg-muted/20">
              <th className="px-4 py-2 text-left text-sm">Campaign</th>
              <th className="px-4 py-2 text-right text-sm">Opens</th>
              <th className="px-4 py-2 text-right text-sm">Clicks</th>
            </tr>
          </thead>
          <tbody>
            {data.map((c) => (
              <tr key={c.id} className="even:bg-muted/10">
                <td className="px-4 py-2 text-sm">{c.subject}</td>
                <td className="px-4 py-2 text-sm text-right">{c.opens}</td>
                <td className="px-4 py-2 text-sm text-right">{c.clicks}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
