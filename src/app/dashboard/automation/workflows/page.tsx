"use client"

import { useState } from "react"
import {
  Plus, Search, ArrowUpDown,
  MoreHorizontal, Workflow, Mail,
  BarChart, Calendar, Filter, Clock,
  CheckCircle2, Circle, AlertCircle
} from "lucide-react"

// Sample workflow data
const workflows = [
  {
    id: "wf-001",
    name: "Welcome Sequence",
    description: "Send a series of welcome emails to new subscribers",
    status: "active",
    triggers: ["New Subscriber"],
    steps: 4,
    lastEdited: "2 days ago",
    conversions: 24,
    conversionRate: "3.2%"
  },
  {
    id: "wf-002",
    name: "Abandoned Cart Recovery",
    description: "Follow up with customers who abandoned their shopping cart",
    status: "active",
    triggers: ["Cart Abandoned"],
    steps: 3,
    lastEdited: "5 days ago",
    conversions: 42,
    conversionRate: "8.7%"
  },
  {
    id: "wf-003",
    name: "Re-engagement Campaign",
    description: "Win back inactive subscribers with special offers",
    status: "draft",
    triggers: ["Inactivity (60 days)"],
    steps: 2,
    lastEdited: "1 week ago",
    conversions: 0,
    conversionRate: "0%"
  },
  {
    id: "wf-004",
    name: "Post-Purchase Follow-up",
    description: "Thank customers and request product reviews",
    status: "active",
    triggers: ["Order Completed"],
    steps: 3,
    lastEdited: "2 weeks ago",
    conversions: 18,
    conversionRate: "2.9%"
  },
  {
    id: "wf-005",
    name: "Birthday Special",
    description: "Send birthday greetings and special offers",
    status: "paused",
    triggers: ["Birthday"],
    steps: 1,
    lastEdited: "1 month ago",
    conversions: 7,
    conversionRate: "11.3%"
  }
]

// Status badge component
function StatusBadge({ status }: { status: string }) {
  let color: string;
  let icon: React.ReactNode;

  switch (status) {
    case "active":
      color = "bg-green-100 text-green-700 border-green-200";
      icon = <CheckCircle2 className="h-3.5 w-3.5 mr-1" />;
      break;
    case "draft":
      color = "bg-orange-100 text-orange-700 border-orange-200";
      icon = <Circle className="h-3.5 w-3.5 mr-1" />;
      break;
    case "paused":
      color = "bg-blue-100 text-blue-700 border-blue-200";
      icon = <AlertCircle className="h-3.5 w-3.5 mr-1" />;
      break;
    default:
      color = "bg-gray-100 text-gray-700 border-gray-200";
      icon = <Circle className="h-3.5 w-3.5 mr-1" />;
  }

  return (
    <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full border ${color}`}>
      {icon}
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}

export default function AutomationWorkflowsPage() {
  const [searchTerm, setSearchTerm] = useState("")

  // Filter workflows based on search term
  const filteredWorkflows = workflows.filter(workflow =>
    workflow.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    workflow.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Automation Workflows</h1>
          <p className="text-muted-foreground mt-1">
            Create and manage automated email sequences triggered by user behavior.
          </p>
        </div>
        <button className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-2 px-4 rounded-md inline-flex items-center">
          <Plus className="h-4 w-4 mr-2" /> Create Workflow
        </button>
      </div>

      {/* Filters and search */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search workflows..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          />
        </div>
        <button className="inline-flex items-center gap-2 px-3 py-2 rounded-md border text-sm">
          <Filter className="h-4 w-4" /> Filter
        </button>
        <button className="inline-flex items-center gap-2 px-3 py-2 rounded-md border text-sm">
          <ArrowUpDown className="h-4 w-4" /> Sort
        </button>
      </div>

      {/* Workflows list */}
      <div className="bg-card rounded-lg border shadow-sm divide-y">
        {filteredWorkflows.length === 0 ? (
          <div className="p-6 text-center">
            <Workflow className="h-10 w-10 mx-auto text-muted-foreground" />
            <h3 className="mt-4 text-lg font-medium">No workflows found</h3>
            <p className="mt-1 text-muted-foreground">
              {searchTerm ? "Try adjusting your search" : "Create your first workflow to get started"}
            </p>
          </div>
        ) : (
          filteredWorkflows.map((workflow) => (
            <div key={workflow.id} className="p-6 hover:bg-muted/40 transition-colors">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-medium">{workflow.name}</h3>
                    <StatusBadge status={workflow.status} />
                  </div>
                  <p className="text-sm text-muted-foreground">{workflow.description}</p>
                </div>
                <div className="flex items-center gap-3">
                  <button className="text-primary hover:text-primary/80 font-medium text-sm">Edit</button>
                  <button className="text-primary hover:text-primary/80 font-medium text-sm">Duplicate</button>
                  <button className="p-1 hover:bg-muted rounded">
                    <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-4 mt-4">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{workflow.steps} steps</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Trigger: {workflow.triggers[0]}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Edited {workflow.lastEdited}</span>
                </div>
                <div className="flex items-center gap-2">
                  <BarChart className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{workflow.conversions} conversions</span>
                </div>
                <div className="flex items-center gap-2">
                  <BarChart className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{workflow.conversionRate} rate</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
