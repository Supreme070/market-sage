"use client"

import { useState } from "react"
import {
  Plus, FileCode, BarChart2, Copy,
  CheckCircle, Settings, Download,
  ExternalLink, ArrowRight, Search,
  Filter, CalendarDays, DollarSign,
  ShoppingCart, Users, Mail
} from "lucide-react"

// Sample conversion sources
const conversionSources = [
  {
    id: "conv-001",
    name: "Product Purchase",
    type: "purchase",
    trackingCode: "<script>trackConversion('product-purchase')</script>",
    conversions: 145,
    value: "$4,325.00",
    lastConverted: "3 hours ago"
  },
  {
    id: "conv-002",
    name: "Newsletter Signup",
    type: "signup",
    trackingCode: "<script>trackConversion('newsletter-signup')</script>",
    conversions: 328,
    value: "N/A",
    lastConverted: "1 hour ago"
  },
  {
    id: "conv-003",
    name: "Free Trial Registration",
    type: "signup",
    trackingCode: "<script>trackConversion('free-trial')</script>",
    conversions: 86,
    value: "N/A",
    lastConverted: "8 hours ago"
  },
  {
    id: "conv-004",
    name: "Premium Plan Upgrade",
    type: "purchase",
    trackingCode: "<script>trackConversion('premium-upgrade')</script>",
    conversions: 24,
    value: "$1,680.00",
    lastConverted: "1 day ago"
  }
]

// Conversion performance by channel
const channelPerformance = [
  { channel: "Email Campaigns", conversions: 248, rate: "4.2%" },
  { channel: "Welcome Sequence", conversions: 152, rate: "3.8%" },
  { channel: "Abandoned Cart", conversions: 63, rate: "12.5%" },
  { channel: "Re-engagement", conversions: 42, rate: "1.9%" },
  { channel: "Post-purchase", conversions: 38, rate: "8.3%" }
]

// Conversion source type icon
function ConversionTypeIcon({ type }: { type: string }) {
  switch (type) {
    case "purchase":
      return <ShoppingCart className="h-5 w-5 text-primary" />;
    case "signup":
      return <Users className="h-5 w-5 text-primary" />;
    default:
      return <CheckCircle className="h-5 w-5 text-primary" />;
  }
}

export default function ConversionTrackingPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [copiedId, setCopiedId] = useState<string | null>(null)

  // Filter conversion sources based on search term
  const filteredSources = conversionSources.filter(source =>
    source.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Handle copy code function
  const handleCopyCode = (id: string, code: string) => {
    navigator.clipboard.writeText(code)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Conversion Tracking</h1>
          <p className="text-muted-foreground mt-1">
            Monitor and analyze conversions from your email marketing campaigns
          </p>
        </div>
        <div className="flex gap-2">
          <button className="inline-flex items-center gap-2 px-3 py-2 rounded-md border text-sm">
            <Settings className="h-4 w-4" /> Settings
          </button>
          <button className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-2 px-4 rounded-md inline-flex items-center">
            <Plus className="h-4 w-4 mr-2" /> Add Conversion Source
          </button>
        </div>
      </div>

      {/* Overview cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-card rounded-lg border shadow-sm p-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-md">
              <CheckCircle className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Conversions</p>
              <p className="text-2xl font-bold">583</p>
            </div>
          </div>
          <div className="mt-3 flex items-center gap-1 text-sm text-green-600">
            <ArrowRight className="h-3.5 w-3.5" />
            <span>+15.8% from last month</span>
          </div>
        </div>

        <div className="bg-card rounded-lg border shadow-sm p-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-md">
              <DollarSign className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Revenue Generated</p>
              <p className="text-2xl font-bold">$6,005.00</p>
            </div>
          </div>
          <div className="mt-3 flex items-center gap-1 text-sm text-blue-600">
            <ArrowRight className="h-3.5 w-3.5" />
            <span>+8.3% from last month</span>
          </div>
        </div>

        <div className="bg-card rounded-lg border shadow-sm p-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-100 rounded-md">
              <BarChart2 className="h-5 w-5 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Average Conversion Rate</p>
              <p className="text-2xl font-bold">4.7%</p>
            </div>
          </div>
          <div className="mt-3 flex items-center gap-1 text-sm text-orange-600">
            <ArrowRight className="h-3.5 w-3.5" />
            <span>+1.2% from last month</span>
          </div>
        </div>
      </div>

      {/* Search and filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search conversion sources..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          />
        </div>
        <button className="inline-flex items-center gap-2 px-3 py-2 rounded-md border text-sm">
          <Filter className="h-4 w-4" /> Filter
        </button>
        <button className="inline-flex items-center gap-2 px-3 py-2 rounded-md border text-sm">
          <CalendarDays className="h-4 w-4" /> Last 30 days
        </button>
      </div>

      {/* Conversion sources */}
      <div className="bg-card rounded-lg border shadow-sm">
        <div className="p-6 border-b">
          <h2 className="font-medium">Conversion Sources</h2>
        </div>
        <div className="divide-y">
          {filteredSources.map((source) => (
            <div key={source.id} className="p-6 hover:bg-muted/40 transition-colors">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-md">
                    <ConversionTypeIcon type={source.type} />
                  </div>
                  <div>
                    <h3 className="font-medium">{source.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {source.type === "purchase" ? "Purchase Tracking" : "Signup Tracking"}
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => handleCopyCode(source.id, source.trackingCode)}
                    className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-primary/80"
                  >
                    {copiedId === source.id ? (
                      <>
                        <CheckCircle className="h-3.5 w-3.5" /> Copied
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" /> Copy Code
                      </>
                    )}
                  </button>
                  <button className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-primary/80">
                    <FileCode className="h-3.5 w-3.5" /> Edit
                  </button>
                  <button className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-primary/80">
                    <ExternalLink className="h-3.5 w-3.5" /> View
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 mt-4">
                <div>
                  <p className="text-sm text-muted-foreground">Conversions</p>
                  <p className="font-medium">{source.conversions}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Value</p>
                  <p className="font-medium">{source.value}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Last Converted</p>
                  <p className="font-medium">{source.lastConverted}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Performance by channel */}
      <div className="bg-card rounded-lg border shadow-sm">
        <div className="p-6 border-b">
          <h2 className="font-medium">Performance by Channel</h2>
        </div>
        <div className="divide-y">
          {channelPerformance.map((channel, index) => (
            <div key={index} className="p-4 grid grid-cols-3 gap-4">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                <p className="font-medium">{channel.channel}</p>
              </div>
              <div>
                <p className="text-muted-foreground text-sm">Conversions</p>
                <p>{channel.conversions}</p>
              </div>
              <div>
                <p className="text-muted-foreground text-sm">Conversion Rate</p>
                <p>{channel.rate}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="p-4 border-t flex justify-center">
          <button className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-primary/80">
            <Download className="h-3.5 w-3.5" /> Download Report
          </button>
        </div>
      </div>
    </div>
  )
}
