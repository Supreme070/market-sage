import Link from "next/link"

export function CTASection() {
  return (
    <section className="bg-primary py-16">
      <div className="container-wide text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold tracking-tight text-white mb-4">
            Try MarketSage for free
          </h2>
          <p className="text-lg text-white/80 mb-8">
            Unlock the power of your customer data to create personalization, 1:1 interactions that drive
            incremental revenue, engagement, and increased customer life time value. Try it free for a
            full 30-day trial.
          </p>
          <Link
            href="/signup"
            className="bg-secondary text-secondary-foreground font-medium px-8 py-3 rounded-md inline-flex hover:bg-secondary/90 transition-colors"
          >
            Get Started
          </Link>
        </div>
      </div>
    </section>
  )
}
