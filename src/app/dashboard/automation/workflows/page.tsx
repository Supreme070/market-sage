"use client";

import { Plus } from "lucide-react";
import WorkflowBuilder from "@/components/workflow/WorkflowBuilder";

export default function AutomationWorkflowsPage() {
  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Automation Workflows</h1>
          <p className="text-muted-foreground mt-1">
            Build and manage your automated workflows visually.
          </p>
        </div>
        <button className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-2 px-4 rounded-md inline-flex items-center">
          <Plus className="h-4 w-4 mr-2" /> Create Workflow
        </button>
      </div>

      {/* Workflow Builder canvas */}
      <div className="w-full h-[600px] bg-background rounded-lg border">
        <WorkflowBuilder />
      </div>
    </div>
  );
}
