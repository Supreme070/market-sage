"use client"

import { useState } from "react"
import { Plus, Search, Filter, LayoutTemplate,
  Clock, CalendarDays, ArrowUpDown, Tag,
  Edit, Copy, Trash, MoreHorizontal, Eye } from "lucide-react"

// Sample templates data
const emailTemplates = [
  {
    id: "tpl-001",
    name: "Welcome Email",
    category: "Onboarding",
    previewImage: "/welcome-template.png",
    lastEdited: "2 days ago",
    usageCount: 452,
    tags: ["welcome", "onboarding"],
  },
  {
    id: "tpl-002",
    name: "Monthly Newsletter",
    category: "Newsletter",
    previewImage: "/newsletter-template.png",
    lastEdited: "1 week ago",
    usageCount: 24,
    tags: ["newsletter", "monthly"],
  },
  {
    id: "tpl-003",
    name: "Abandoned Cart Reminder",
    category: "E-commerce",
    previewImage: "/cart-template.png",
    lastEdited: "3 days ago",
    usageCount: 187,
    tags: ["ecommerce", "cart"],
  },
  {
    id: "tpl-004",
    name: "Product Announcement",
    category: "Marketing",
    previewImage: "/product-template.png",
    lastEdited: "5 days ago",
    usageCount: 76,
    tags: ["product", "announcement"],
  },
  {
    id: "tpl-005",
    name: "Feedback Request",
    category: "Engagement",
    previewImage: "/feedback-template.png",
    lastEdited: "1 month ago",
    usageCount: 103,
    tags: ["feedback", "survey"],
  },
]

// Category badge component
function CategoryBadge({ category }: { category: string }) {
  const categoryColors: { [key: string]: string } = {
    "Onboarding": "bg-blue-100 text-blue-700 border-blue-200",
    "Newsletter": "bg-purple-100 text-purple-700 border-purple-200",
    "E-commerce": "bg-green-100 text-green-700 border-green-200",
    "Marketing": "bg-orange-100 text-orange-700 border-orange-200",
    "Engagement": "bg-pink-100 text-pink-700 border-pink-200",
  }

  const color = categoryColors[category] || "bg-gray-100 text-gray-700 border-gray-200"

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 text-xs font-medium rounded-full border ${color}`}>
      {category}
    </span>
  )
}

export default function EmailTemplatesPage() {
  const [searchTerm, setSearchTerm] = useState("")

  // Filter templates based on search term
  const filteredTemplates = emailTemplates.filter(template =>
    template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    template.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    template.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Email Templates</h1>
          <p className="text-muted-foreground mt-1">
            Design and manage your email templates for campaigns and automation
          </p>
        </div>
        <button className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-2 px-4 rounded-md inline-flex items-center">
          <Plus className="h-4 w-4 mr-2" /> Create Template
        </button>
      </div>

      {/* Filters and search */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search templates..."
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

      {/* Templates grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.length === 0 ? (
          <div className="col-span-full bg-card rounded-lg border shadow-sm p-8 text-center">
            <LayoutTemplate className="h-12 w-12 mx-auto text-muted-foreground" />
            <h3 className="mt-4 text-lg font-medium">No templates found</h3>
            <p className="mt-1 text-muted-foreground">
              {searchTerm ? "Try adjusting your search" : "Create your first template to get started"}
            </p>
          </div>
        ) : (
          filteredTemplates.map((template) => (
            <div key={template.id} className="group bg-card rounded-lg border shadow-sm overflow-hidden hover:border-primary transition-colors">
              {/* Template preview image (placeholder for this demo) */}
              <div className="h-48 bg-muted relative flex items-center justify-center">
                <LayoutTemplate className="h-12 w-12 text-muted-foreground" />

                {/* Preview overlay */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button className="bg-white text-black hover:bg-white/90 font-medium px-4 py-2 rounded-md inline-flex items-center">
                    <Eye className="h-4 w-4 mr-2" /> Preview
                  </button>
                </div>
              </div>

              <div className="p-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium truncate">{template.name}</h3>
                  <CategoryBadge category={template.category} />
                </div>

                <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    <span>{template.lastEdited}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <CalendarDays className="h-3.5 w-3.5" />
                    <span>Used {template.usageCount} times</span>
                  </div>
                </div>

                <div className="mt-3 flex flex-wrap gap-1">
                  {template.tags.map((tag) => (
                    <div key={tag} className="inline-flex items-center gap-1 text-xs bg-muted px-2 py-1 rounded-md">
                      <Tag className="h-3 w-3" />
                      <span>{tag}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-4 pt-4 border-t flex items-center gap-2">
                  <button className="text-primary hover:text-primary/80 p-1 rounded-md hover:bg-muted">
                    <Edit className="h-4 w-4" />
                  </button>
                  <button className="text-primary hover:text-primary/80 p-1 rounded-md hover:bg-muted">
                    <Copy className="h-4 w-4" />
                  </button>
                  <button className="text-destructive hover:text-destructive/80 p-1 rounded-md hover:bg-muted">
                    <Trash className="h-4 w-4" />
                  </button>
                  <div className="ml-auto">
                    <button className="text-muted-foreground hover:text-foreground p-1 rounded-md hover:bg-muted">
                      <MoreHorizontal className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
