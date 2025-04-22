import Link from "next/link"
import {
  Workflow, Mail, BarChart2, LineChart,
  PenTool, Zap, Users, Laptop, ShoppingCart
} from "lucide-react"

import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"

// Feature section component
function FeatureSection({
  title,
  description,
  image,
  icon: Icon,
  ctaLink,
  ctaText,
  features,
  reversed = false
}: {
  title: string
  description: string
  image?: string
  icon: React.ElementType
  ctaLink: string
  ctaText: string
  features: string[]
  reversed?: boolean
}) {
  return (
    <section className="py-16 md:py-24 border-b border-border">
      <div className="container-wide">
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${reversed ? 'lg:flex-row-reverse' : ''}`}>
          {/* Content */}
          <div className="space-y-6">
            <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-lg">
              <Icon className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-3xl font-bold">{title}</h2>
            <p className="text-lg text-muted-foreground">{description}</p>

            <ul className="space-y-3">
              {features.map((feature, i) => (
                <li key={i} className="flex items-start gap-2">
                  <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center mt-0.5 flex-shrink-0">
                    <Zap className="h-3.5 w-3.5 text-primary" />
                  </div>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <div>
              <Link
                href={ctaLink}
                className="btn-primary inline-block mt-4"
              >
                {ctaText}
              </Link>
            </div>
          </div>

          {/* Image/Visual */}
          <div className="bg-muted/30 rounded-lg aspect-video flex items-center justify-center">
            {image ? (
              <img
                src={image}
                alt={title}
                className="rounded-lg shadow-md"
              />
            ) : (
              <div className="text-center">
                <Icon className="h-20 w-20 mx-auto text-muted-foreground/50" />
                <p className="text-sm text-muted-foreground mt-4">Feature visualization</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export const metadata = {
  title: "Features - MarketSage",
  description: "Explore the powerful features of MarketSage email marketing platform",
}

export default function FeaturesPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="bg-primary py-16 md:py-24">
          <div className="container-wide text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Powerful Features for Email Marketing Success
            </h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Everything you need to create, automate, and optimize your email marketing campaigns
            </p>
          </div>
        </section>

        {/* Marketing Automation Feature */}
        <FeatureSection
          title="Marketing Automation"
          description="Create sophisticated automation workflows triggered by user behavior and drive more conversions with targeted email sequences."
          icon={Workflow}
          ctaLink="/dashboard/automation/workflows"
          ctaText="Explore Automation"
          features={[
            "Build visual workflows with our intuitive drag-and-drop builder",
            "Set up triggers based on subscriber actions and behaviors",
            "Create conditional paths based on subscriber data",
            "Track conversions and optimize your automation sequences",
            "Schedule emails based on optimal engagement times"
          ]}
        />

        {/* Email Design Feature */}
        <FeatureSection
          title="Email Design & Templates"
          description="Create beautiful, responsive emails without coding skills using our intuitive drag-and-drop email builder and template library."
          icon={PenTool}
          ctaLink="/dashboard/email/templates"
          ctaText="Explore Email Design"
          features={[
            "Drag-and-drop email builder for easy design",
            "Library of pre-designed, responsive templates",
            "Custom HTML editor for advanced users",
            "Preview emails across multiple devices",
            "Save and reuse your own custom templates"
          ]}
          reversed={true}
        />

        {/* Analytics Feature */}
        <FeatureSection
          title="Advanced Analytics"
          description="Gain valuable insights into your email campaigns with comprehensive analytics and reporting tools."
          icon={BarChart2}
          ctaLink="/dashboard/analytics"
          ctaText="Explore Analytics"
          features={[
            "Track opens, clicks, bounces, and unsubscribes",
            "Monitor conversion rates and ROI",
            "A/B test different email elements",
            "Segment reporting by subscriber groups",
            "Export data for custom analysis"
          ]}
        />

        {/* Conversion Tracking Feature */}
        <FeatureSection
          title="Conversion Tracking"
          description="Measure the effectiveness of your email campaigns by tracking conversions and revenue generated."
          icon={LineChart}
          ctaLink="/dashboard/automation/conversion-tracking"
          ctaText="Explore Conversion Tracking"
          features={[
            "Track purchases, signups, and other conversion events",
            "Measure revenue attributed to email campaigns",
            "Analyze conversion performance by campaign",
            "Optimize email sequences based on conversion data",
            "Set up custom conversion goals and events"
          ]}
          reversed={true}
        />

        {/* CTA Section */}
        <section className="py-16 md:py-24">
          <div className="container-wide text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to get started?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Try MarketSage free for 30 days. No credit card required.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/signup" className="btn-primary">
                Start Free Trial
              </Link>
              <Link
                href="/pricing"
                className="bg-muted hover:bg-muted/80 text-foreground font-medium px-6 py-3 rounded-md text-center"
              >
                View Pricing
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
