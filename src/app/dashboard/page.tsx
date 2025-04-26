"use client";

import { useState, useEffect } from "react";
import {
  BarChart as BarIcon,
  Mail,
  Users,
  ArrowUp,
  ArrowDown,
  MoreHorizontal,
  Inbox,
  BarChart2,
  Send,
  Trash,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Sample data for the chart
const performanceData = [
  { name: "Week 1", emailsSent: 50, opens: 20 },
  { name: "Week 2", emailsSent: 75, opens: 35 },
  { name: "Week 3", emailsSent: 100, opens: 60 },
  { name: "Week 4", emailsSent: 125, opens: 80 },
];

function DashboardCard({
  title,
  value,
  icon: Icon,
  change,
  changeType,
}: {
  title: string;
  value: string;
  icon: React.ElementType;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
}) {
  return (
    <div className="bg-card rounded-lg border shadow-sm p-6">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        <div className="p-2 bg-primary/10 rounded-md">
          <Icon className="h-5 w-5 text-primary" />
        </div>
      </div>
      <div className="mt-4">
        <p className="text-2xl font-bold">{value}</p>
        {change && (
          <p
            className={`text-sm mt-1 flex items-center ${
              changeType === "positive"
                ? "text-green-500"
                : changeType === "negative"
                ? "text-red-500"
                : "text-muted-foreground"
            }`}
          >
            {changeType === "positive" ? (
              <ArrowUp className="h-3 w-3 mr-1" />
            ) : changeType === "negative" ? (
              <ArrowDown className="h-3 w-3 mr-1" />
            ) : null}
            {change}
          </p>
        )}
      </div>
    </div>
  );
}

function ActivityItem({
  icon: Icon,
  title,
  time,
  description,
}: {
  icon: React.ElementType;
  title: string;
  time: string;
  description: string;
}) {
  return (
    <div className="flex gap-4 py-3">
      <div className="p-2 bg-primary/10 rounded-md h-fit">
        <Icon className="h-4 w-4 text-primary" />
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <p className="font-medium text-sm">{title}</p>
          <span className="text-xs text-muted-foreground">{time}</span>
        </div>
        <p className="text-sm text-muted-foreground mt-1">{description}</p>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const [userName, setUserName] = useState("User");

  useEffect(() => {
    try {
      const auth = localStorage.getItem("marketSageAuth");
      if (auth) {
        const { user } = JSON.parse(auth);
        if (user?.email) {
          const name = user.email.split("@")[0];
          setUserName(name.charAt(0).toUpperCase() + name.slice(1));
        }
      }
    } catch (error) {
      console.error("Error getting user data:", error);
    }
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back, {userName}! Here's an overview of your email marketing.
        </p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard
          title="Total Subscribers"
          value="2,431"
          icon={Users}
          change="+5.4% from last month"
          changeType="positive"
        />
        <DashboardCard
          title="Email Campaigns"
          value="24"
          icon={Mail}
          change="3 active campaigns"
          changeType="neutral"
        />
        <DashboardCard
          title="Open Rate"
          value="32%"
          icon={Inbox}
          change="+2.1% from last month"
          changeType="positive"
        />
        <DashboardCard
          title="Click Rate"
          value="4.3%"
          icon={BarIcon}
          change="-0.8% from last month"
          changeType="negative"
        />
      </div>

      {/* Graphs and activity feed */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Performance chart */}
        <div className="lg:col-span-2 bg-card rounded-lg border shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-medium">Campaign Performance</h3>
            <button className="p-1 hover:bg-muted rounded">
              <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
            </button>
          </div>

          {/* Replace placeholder with Recharts line chart */}
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={performanceData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="opens"
                  stroke="#8884d8"
                  strokeWidth={2}
                  dot={{ r: 3 }}
                  activeDot={{ r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Activity feed */}
        <div className="bg-card rounded-lg border shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium">Recent Activity</h3>
            <button className="text-sm text-primary hover:underline">
              View all
            </button>
          </div>
          <div className="space-y-2 divide-y">
            <ActivityItem
              icon={Send}
              title="Campaign Sent"
              time="2 hours ago"
              description="Monthly Newsletter was sent to 2,431 subscribers."
            />
            <ActivityItem
              icon={Users}
              title="New Subscribers"
              time="Yesterday"
              description="15 new subscribers joined your mailing list."
            />
            <ActivityItem
              icon={Trash}
              title="Unsubscribes"
              time="2 days ago"
              description="3 people unsubscribed from Weekly Updates."
            />
          </div>
        </div>
      </div>
    </div>
  );
}
