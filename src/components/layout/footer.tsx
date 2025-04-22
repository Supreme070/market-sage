import Link from "next/link"
import { Logo } from "@/components/ui/logo"

const footerLinks = [
  {
    title: "MarketSage",
    links: [
      { label: "About", href: "/about" },
      { label: "Features", href: "/features" },
      { label: "Pricing", href: "/pricing" },
      { label: "Customer Corner", href: "/customer-corner" },
      { label: "System Status", href: "/system-status" },
      { label: "Careers", href: "/careers" },
      { label: "Non-Profit Program", href: "/non-profit-program" },
    ],
  },
  {
    title: "Product",
    links: [
      { label: "Login", href: "/login" },
      { label: "Sign Up", href: "/signup" },
      { label: "API Docs", href: "/api-docs" },
      { label: "Integrations", href: "/integrations" },
    ],
  },
  {
    title: "Become a Partner",
    links: [
      { label: "Partner Program", href: "/partner-program" },
      { label: "For Affiliates", href: "/for-affiliates" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Blog", href: "/blog" },
      { label: "Help Center", href: "/help-center" },
      { label: "Webinars", href: "/webinars" },
      { label: "Trust Center", href: "/trust-center" },
      { label: "Creative Services", href: "/creative-services" },
    ],
  },
]

export function Footer() {
  return (
    <footer className="bg-background border-t">
      <div className="container-wide py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {footerLinks.map((section) => (
            <div key={section.title} className="space-y-4">
              <h4 className="text-base font-semibold">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4">
              <Logo />
            </div>
            <div className="flex items-center space-x-4 text-xs text-muted-foreground">
              <Link href="/terms" className="hover:text-foreground">Terms</Link>
              <Link href="/privacy-policy" className="hover:text-foreground">Privacy Policy</Link>
              <Link href="/cookie-policy" className="hover:text-foreground">Cookie Policy</Link>
            </div>
          </div>
          <div className="mt-4 text-xs text-muted-foreground text-center md:text-right">
            © {new Date().getFullYear()} MarketSage, Inc. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  )
}
