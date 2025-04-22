import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { LoginForm } from "@/components/auth/login-form"

export const metadata = {
  title: "Login - MarketSage",
  description: "Login to your MarketSage account",
}

export default function LoginPage() {
  return (
    <>
      <Navbar />
      <main className="py-16 min-h-[calc(100vh-80px-300px)]">
        <div className="container-wide">
          <div className="bg-card shadow-sm border rounded-lg max-w-md mx-auto">
            <LoginForm />
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
