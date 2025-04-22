import { Check } from "lucide-react"
import Link from "next/link"

const pricingPlans = [
  {
    name: "Starter",
    price: 59,
    description: "For individuals and small businesses just getting started with email marketing.",
    features: [
      "Up to 5k contacts",
      "Experiments",
      "Autoresponders",
      "5 Users"
    ],
    cta: "Start Free Trial",
    href: "/signup"
  },
  {
    name: "Essential",
    price: 179,
    popular: true,
    description: "For growing businesses looking to scale their email marketing efforts.",
    features: [
      "Up to 15k contacts",
      "Experiments",
      "Dynamic content",
      "12 Users"
    ],
    cta: "Start Free Trial",
    href: "/signup"
  },
  {
    name: "Advanced",
    price: 649,
    description: "For businesses with advanced email marketing needs and larger audiences.",
    features: [
      "Up to 100k contacts",
      "Advanced behavior",
      "Automation workflows",
      "20+ Features"
    ],
    cta: "Start Free Trial",
    href: "/signup"
  }
]

export function PricingSection() {
  return (
    <section className="py-20 bg-background">
      <div className="container-wide">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight mb-4">
            Find the right plan for your business
          </h2>
          <p className="text-lg text-muted-foreground">
            Transparent, affordable and flexible pricing. Try our advanced features free for 30 days.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingPlans.map((plan) => (
            <div
              key={plan.name}
              className={`border rounded-xl overflow-hidden transition-all ${
                plan.popular ? "border-primary shadow-md" : "border-border hover:border-primary/60"
              }`}
            >
              {plan.popular && (
                <div className="bg-primary text-primary-foreground py-2 text-center text-sm font-medium">
                  Popular
                </div>
              )}
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-1">{plan.name}</h3>
                <p className="text-muted-foreground text-sm mb-4">{plan.description}</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold">${plan.price}</span>
                  <span className="text-muted-foreground">/mo</span>
                </div>
                <Link
                  href={plan.href}
                  className={`w-full block text-center py-2 rounded-md font-medium ${
                    plan.popular
                      ? "bg-primary text-primary-foreground hover:bg-primary/90"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/90"
                  } transition-colors`}
                >
                  {plan.cta}
                </Link>
              </div>
              <div className="border-t p-6">
                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
