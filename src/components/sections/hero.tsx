import Link from "next/link"
import Image from "next/image"

export function HeroSection() {
  return (
    <section className="bg-primary py-16 md:py-24">
      <div className="container-wide">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
              Advanced email marketing platform at fraction of the cost.
            </h1>
            <p className="text-lg md:text-xl text-white/80">
              All the tools and advanced email marketing features you need,
              without breaking the bank. Connect with your audience effortlessly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="/signup" className="bg-secondary text-secondary-foreground font-medium px-6 py-3 rounded-md text-center hover:bg-secondary/90 transition-colors">
                Get Started Free
              </Link>
              <Link href="/pricing" className="bg-white/10 text-white font-medium px-6 py-3 rounded-md text-center hover:bg-white/20 transition-colors">
                View Pricing
              </Link>
            </div>
          </div>
          <div className="relative">
            <div className="bg-white p-6 rounded-lg shadow-xl">
              <div className="flex space-x-4 mb-4">
                <div className="w-3 h-3 rounded-full bg-secondary" />
                <div className="w-3 h-3 rounded-full bg-accent" />
                <div className="w-3 h-3 rounded-full bg-primary/50" />
              </div>
              <div className="space-y-4">
                <div className="h-10 bg-gray-100 rounded w-full" />
                <div className="grid grid-cols-2 gap-4">
                  <div className="h-32 bg-gray-100 rounded" />
                  <div className="h-32 bg-gray-100 rounded" />
                </div>
                <div className="h-10 bg-gray-100 rounded w-2/3" />
                <div className="h-24 bg-gray-100 rounded" />
              </div>
            </div>
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-secondary rounded-full flex items-center justify-center text-lg font-bold text-secondary-foreground">
              Pro
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
