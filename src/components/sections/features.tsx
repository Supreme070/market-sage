import { Mail, ChevronRight, BarChart3, Settings2, Workflow, Zap } from "lucide-react"
import Link from "next/link"

const features = [
  {
    id: "email-builder",
    title: "Smart Email Builder",
    description:
      "Create beautiful, responsive emails that look great on any device with our intuitive drag-and-drop builder.",
    icon: Mail,
  },
  {
    id: "automation",
    title: "Marketing Automation",
    description:
      "Automate your marketing campaigns with our powerful workflow builder to nurture leads and increase conversions.",
    icon: Workflow,
  },
  {
    id: "analytics",
    title: "Advanced Analytics",
    description:
      "Get detailed insights into campaign performance with comprehensive reporting and analytics dashboards.",
    icon: BarChart3,
  },
  {
    id: "personalization",
    title: "Personalization",
    description:
      "Create dynamic content that changes based on subscriber data, behavior, and preferences.",
    icon: Settings2,
  },
  {
    id: "integrations",
    title: "Integrations",
    description:
      "Connect with your favorite tools and platforms to create seamless marketing workflows.",
    icon: Zap,
  },
]

export function FeaturesSection() {
  return (
    <section className="py-20 bg-background">
      <div className="container-wide">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight mb-4">
            Craft relevant, engaging customer journeys with our automation workflow builder.
          </h2>
          <p className="text-lg text-muted-foreground">
            Powerful email marketing tools designed to help you connect with your audience, drive conversions,
            and grow your business.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map(({ id, title, description, icon: Icon }) => (
            <div
              key={id}
              className="bg-background border rounded-lg p-6 transition-all hover:shadow-md hover:border-primary"
            >
              <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center mb-6">
                <Icon className="w-6 h-6 text-primary" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{title}</h3>
              <p className="text-muted-foreground mb-4">{description}</p>
              <Link
                href={`/features/${id}`}
                className="group inline-flex items-center text-primary font-medium"
                aria-label={`Learn more about ${title}`}
              >
                Learn more{" "}
                <ChevronRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
