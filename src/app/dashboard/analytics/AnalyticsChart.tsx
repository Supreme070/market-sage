// src/app/dashboard/analytics/AnalyticsChart.tsx
"use client";

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export type CampaignStat = {
  id: string;
  subject: string;
  opens: number;
  clicks: number;
};

interface AnalyticsChartProps {
  data: CampaignStat[];
}

export default function AnalyticsChart({ data }: AnalyticsChartProps) {
  return (
    <div className="bg-card rounded-lg border shadow-sm p-4">
      <h2 className="font-medium mb-4">Opens vs. Clicks</h2>
      <div className="w-full h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 10, right: 20, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="subject"
              tick={{ fontSize: 12 }}
              interval={0}
              angle={-20}
              textAnchor="end"
              height={60}
            />
            <YAxis />
            <Tooltip />
            <Legend verticalAlign="top" />
            <Bar dataKey="opens" name="Opens" fill="#4ade80" />
            <Bar dataKey="clicks" name="Clicks" fill="#60a5fa" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
