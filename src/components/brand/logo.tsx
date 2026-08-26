import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { site } from "@/data/site"

type LogoProps = {
  /** "ink" for light surfaces, "light" for dark surfaces. */
  tone?: "ink" | "light"
  className?: string
  /** Renders the mark only, without the wordmark. */
  markOnly?: boolean
}

/**
 * Brand lockup. The saturated brand red lives only inside the logo mark —
 * everywhere else the palette uses the toned-down accent.
 */
export function Logo({ tone = "ink", className, markOnly = false }: LogoProps) {
  return (
    <Link
      href="/"
      aria-label={`${site.name} — home`}
      className={cn("group inline-flex items-center gap-3", className)}
    >
      <Image
        src="/images/logo-icon-white.svg"
        alt=""
        width={500}
        height={500}
        priority
        sizes="64px"
        className="size-13 rounded-full sm:size-16"
      />
      {!markOnly && (
        <span className="flex flex-col leading-none">
          <span
            className={cn(
              "display text-xl tracking-[0.06em] uppercase sm:text-2xl",
              tone === "light" ? "text-primary-foreground" : "text-foreground",
            )}
          >
            Dream Spa
          </span>
          <span
            className={cn(
              "eyebrow mt-1.5 text-[0.625rem] tracking-[0.24em]",
              tone === "light"
                ? "text-primary-foreground/60"
                : "text-muted-foreground",
            )}
          >
            Ahmedabad
          </span>
        </span>
      )}
    </Link>
  )
}
