// src/app/dashboard/email/campaigns/page.tsx
"use client";

import { Plus, Search, Filter } from "lucide-react";
import { sampleCampaigns } from "@/data/sampleCampaigns";

export default function CampaignsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Campaigns</h1>
          <p className="text-muted-foreground mt-1">
            Create, manage and track your email campaigns.
          </p>
        </div>
        <button className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-2 px-4 rounded-md inline-flex items-center">
          <Plus className="h-4 w-4 mr-2" /> New Campaign
        </button>
      </div>

      {/* Search & filter bar */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search campaigns..."
            className="pl-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          />
        </div>
        <button className="inline-flex items-center gap-2 px-3 py-2 rounded-md border text-sm">
          <Filter className="h-4 w-4" /> Filter
        </button>
      </div>

      {/* Campaigns grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sampleCampaigns.map((c) => (
          <div key={c.id} className="bg-card rounded-lg border shadow-sm p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-medium">{c.name}</h3>
              <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-primary/10 text-primary">
                {c.status}
              </span>
            </div>
            <p className="text-sm text-muted-foreground">Created: {c.createdAt}</p>
            <p className="text-sm text-muted-foreground">
              Subscribers: {c.subscribersCount.toLocaleString()}
            </p>
            <p className="text-sm text-muted-foreground">Opens: {c.opens}</p>
            <p className="text-sm text-muted-foreground">Clicks: {c.clicks}</p>
          </div>
        ))}
      </div>
    </div>
);
}
