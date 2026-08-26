import { cn } from "@/lib/utils"

type PageHeaderProps = {
  eyebrow: string
  title: string
  description?: string
  /** Optional right-hand column, e.g. a short meta list. */
  aside?: React.ReactNode
  className?: string
}

export function PageHeader({
  eyebrow,
  title,
  description,
  aside,
  className,
}: PageHeaderProps) {
  return (
    <header className={cn("border-b border-border", className)}>
      <div className="shell flex flex-col gap-10 py-14 lg:flex-row lg:items-end lg:justify-between lg:gap-20 lg:py-20">
        <div className="max-w-2xl">
          <span className="eyebrow flex items-center gap-3 text-muted-foreground">
            <span aria-hidden="true" className="h-px w-8 bg-accent" />
            {eyebrow}
          </span>
          <h1 className="display mt-6 text-4xl text-balance sm:text-5xl lg:text-[3.5rem]">
            {title}
          </h1>
          {description && (
            <p className="mt-7 max-w-xl text-base leading-relaxed text-pretty text-muted-foreground">
              {description}
            </p>
          )}
        </div>
        {aside && <div className="shrink-0 lg:pb-2">{aside}</div>}
      </div>
    </header>
  )
}
