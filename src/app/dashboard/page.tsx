"use client"

import { useState, useEffect } from "react"
import { BarChart, Mail, Users, ArrowUp, ArrowDown, MoreHorizontal, Inbox, Send, Trash, BarChart2 } from "lucide-react"

// A simple Card component for the dashboard
function DashboardCard({ title, value, icon: Icon, change, changeType }: {
  title: string
  value: string
  icon: React.ElementType
  change?: string
  changeType?: "positive" | "negative" | "neutral"
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
          <p className={`text-sm mt-1 flex items-center ${
            changeType === "positive"
              ? "text-green-500"
              : changeType === "negative"
              ? "text-red-500"
              : "text-muted-foreground"
          }`}>
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
  )
}

// A simple activity item component
function ActivityItem({ icon: Icon, title, time, description }: {
  icon: React.ElementType
  title: string
  time: string
  description: string
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
  )
}

export default function DashboardPage() {
  const [userName, setUserName] = useState("User")

  useEffect(() => {
    // Get user data from localStorage
    try {
      const auth = localStorage.getItem('marketSageAuth')
      if (auth) {
        const { user } = JSON.parse(auth)
        if (user?.email) {
          // Extract name from email (for demo purposes)
          const name = user.email.split('@')[0]
          setUserName(name.charAt(0).toUpperCase() + name.slice(1))
        }
      }
    } catch (error) {
      console.error("Error getting user data:", error)
    }
  }, [])

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
          icon={BarChart}
          change="-0.8% from last month"
          changeType="negative"
        />
      </div>

      {/* Graphs and activity feed */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Performance chart placeholder */}
        <div className="lg:col-span-2 bg-card rounded-lg border shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-medium">Campaign Performance</h3>
            <button className="p-1 hover:bg-muted rounded">
              <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
            </button>
          </div>
          <div className="aspect-[4/3] bg-muted/30 rounded-md flex items-center justify-center">
            <div className="text-center">
              <BarChart2 className="h-10 w-10 mx-auto text-muted-foreground/50" />
              <p className="text-sm text-muted-foreground mt-2">Performance visualization will appear here</p>
            </div>
          </div>
        </div>

        {/* Activity feed */}
        <div className="bg-card rounded-lg border shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium">Recent Activity</h3>
            <button className="text-sm text-primary hover:underline">View all</button>
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
  )
}
