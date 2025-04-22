import { cn } from "@/lib/utils";
import Link from "next/link";

interface LogoProps {
  className?: string;
  href?: string;
}

export function Logo({ className, href = "/" }: LogoProps) {
  return (
    <Link href={href} className={cn("flex items-center space-x-2", className)}>
      <span className="text-primary font-bold text-2xl">
        <span>Market</span>
        <span className="text-secondary">Sage</span>
      </span>
    </Link>
  );
}
