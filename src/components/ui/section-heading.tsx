import { cn } from "@/lib/utils"

type SectionHeadingProps = {
  eyebrow?: string
  title: string
  description?: string
  align?: "start" | "center"
  tone?: "ink" | "light"
  as?: "h1" | "h2" | "h3"
  className?: string
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "start",
  tone = "ink",
  as: Heading = "h2",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex max-w-2xl flex-col",
        align === "center" && "mx-auto items-center text-center",
        className,
      )}
    >
      {eyebrow && (
        <span
          className={cn(
            "eyebrow flex items-center gap-3",
            tone === "light"
              ? "text-primary-foreground/60"
              : "text-muted-foreground",
          )}
        >
          <span
            aria-hidden="true"
            className={cn(
              "h-px w-8",
              tone === "light" ? "bg-primary-foreground/30" : "bg-accent",
            )}
          />
          {eyebrow}
        </span>
      )}
      <Heading
        className={cn(
          "display mt-5 text-3xl text-balance sm:text-4xl lg:text-[2.75rem]",
          tone === "light" ? "text-primary-foreground" : "text-foreground",
        )}
      >
        {title}
      </Heading>
      {description && (
        <p
          className={cn(
            "mt-5 text-base leading-relaxed text-pretty",
            tone === "light"
              ? "text-primary-foreground/70"
              : "text-muted-foreground",
          )}
        >
          {description}
        </p>
      )}
    </div>
  )
}
