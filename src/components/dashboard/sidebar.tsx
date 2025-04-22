"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Mail,
  BarChart2,
  Users,
  Settings,
  Workflow,
  LineChart,
  PenTool,
  HelpCircle,
  ChevronDown,
  ChevronUp
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Logo } from "@/components/ui/logo"

interface NavItemProps {
  href: string
  icon: React.ElementType
  label: string
  active?: boolean
  onClick?: () => void
}

function NavItem({ href, icon: Icon, label, active, onClick }: NavItemProps) {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
        active
          ? "bg-primary/10 text-primary font-medium"
          : "text-muted-foreground hover:bg-muted hover:text-foreground"
      )}
      onClick={onClick}
    >
      <Icon className="h-4 w-4" />
      <span>{label}</span>
    </Link>
  )
}

interface NavGroupProps {
  label: string
  icon: React.ElementType
  children: React.ReactNode
  defaultOpen?: boolean
}

function NavGroup({ label, icon: Icon, children, defaultOpen = false }: NavGroupProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
      >
        <div className="flex items-center gap-3">
          <Icon className="h-4 w-4" />
          <span>{label}</span>
        </div>
        {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
      </button>
      {isOpen && <div className="mt-1 ml-5 space-y-1">{children}</div>}
    </div>
  )
}

export function DashboardSidebar() {
  const pathname = usePathname()

  return (
    <div className="w-64 border-r bg-card min-h-screen">
      <div className="p-6">
        <Logo />
      </div>
      <div className="px-3 py-2">
        <nav className="space-y-1">
          <NavItem
            href="/dashboard"
            icon={LayoutDashboard}
            label="Dashboard"
            active={pathname === "/dashboard"}
          />

          <NavGroup label="Email Marketing" icon={Mail} defaultOpen={pathname.includes("/dashboard/email")}>
            <NavItem
              href="/dashboard/email/campaigns"
              icon={Mail}
              label="Campaigns"
              active={pathname === "/dashboard/email/campaigns"}
            />
            <NavItem
              href="/dashboard/email/templates"
              icon={PenTool}
              label="Email Templates"
              active={pathname === "/dashboard/email/templates"}
            />
            <NavItem
              href="/dashboard/email/subscribers"
              icon={Users}
              label="Subscribers"
              active={pathname === "/dashboard/email/subscribers"}
            />
          </NavGroup>

          <NavGroup label="Automation" icon={Workflow} defaultOpen={pathname.includes("/dashboard/automation")}>
            <NavItem
              href="/dashboard/automation/workflows"
              icon={Workflow}
              label="Workflows"
              active={pathname === "/dashboard/automation/workflows"}
            />
            <NavItem
              href="/dashboard/automation/conversion-tracking"
              icon={LineChart}
              label="Conversion Tracking"
              active={pathname === "/dashboard/automation/conversion-tracking"}
            />
          </NavGroup>

          <NavItem
            href="/dashboard/analytics"
            icon={BarChart2}
            label="Analytics"
            active={pathname === "/dashboard/analytics"}
          />

          <NavItem
            href="/dashboard/settings"
            icon={Settings}
            label="Settings"
            active={pathname === "/dashboard/settings"}
          />

          <NavItem
            href="/dashboard/help"
            icon={HelpCircle}
            label="Help & Support"
            active={pathname === "/dashboard/help"}
          />
        </nav>
      </div>
    </div>
  )
}
