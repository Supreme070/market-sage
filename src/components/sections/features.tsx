import { Mail, ChevronRight, BarChart3, Settings2, Workflow, Zap, ShoppingCart, Filter } from "lucide-react"
import Link from "next/link"

const features = [
  {
    id: "ecommerce-integration",
    title: "eCommerce Integration",
    description:
      "Sync product and customer data from stores to enable personalized automation and targeted messaging. Works with WooCommerce, Shopify, etc.",
    icon: ShoppingCart,
  },
  {
    id: "smart-segmentation",
    title: "Smart Segmentation",
    description:
      "Group customers using detailed filters such as purchase history, total spend, last activity, and product interest.",
    icon: Filter,
  },
  {
    id: "deep-analytics",
    title: "Deep Analytics",
    description:
      "Access insights into customer behavior, segment performance, and campaign results in real-time.",
    icon: BarChart3,
  },
  {
    id: "dynamic-personalization",
    title: "Dynamic Personalization",
    description:
      "Use contact attributes like location, gender, or interests to personalize content dynamically.",
    icon: Settings2,
  },
  {
    id: "cart-abandonment",
    title: "Cart Abandonment",
    description:
      "Automatically re-engage customers who leave items in their cart. Recover lost revenue with triggered reminders.",
    icon: ShoppingCart,
  },
  {
    id: "transactional-emails",
    title: "Transactional Emails",
    description:
      "Send time-sensitive messages like order confirmations, password resets, shipping updates, and more — in real-time.",
    icon: Mail,
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
                Learn more{` `}
                <ChevronRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
